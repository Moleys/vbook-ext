function execute(url) {
    url = url.replace('m.fuxsb.com', 'www.fuxsb.com').replace('m.fuxsb.cc', 'www.fuxsb.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let name = doc.select("h1").text().trim();
        let authorEl = doc.select("a[href*='show=writer']").first();
        let author = authorEl ? authorEl.text().trim() : "";
        let genres = [];
        genres.push({
            title: author,
            input: "https://www.fuxsb.com" + authorEl.attr("href"),
            script: "gen.js"
        })
        let categoryEl = doc.select(".tbtls a").first();
        if (categoryEl) {
            let catName = categoryEl.text().trim();
            if (catName && catName.indexOf("作者") === -1 && catName !== author) {
                genres.push({
                    title: catName,
                    input: "https://www.fuxsb.com" + categoryEl.attr("href"),
                    script: "gen.js"
                });
            }
        }
        doc.select("a[href*='/tags-']").forEach(el => {
            genres.push({
                title: el.text().trim(),
                input: "https://www.fuxsb.com" + el.attr("href"),
                script: "gen.js"
            });
        });
        let description = "";
        let tbtls = doc.select("div.tbtls").first();
        if (tbtls) description += tbtls.text().trim() + "\n";
        doc.select("p").forEach(p => {
            let txt = p.text().trim();
            if (txt.match(/内容标签|主角视角|一句话简介|立意/)) description += txt + "\n";
        });
        let suggests = [];
        let h4 = doc.select("h4").first();
        if (h4 && h4.text().indexOf("推荐") !== -1) {
            let recList = [];
            h4.next().select("a").forEach(el => {
                let rTitle = el.text().trim();
                let rLink = el.attr("href");
                if (rTitle && rLink) {
                    recList.push({ title: rTitle, input: "https://www.fuxsb.com" + rLink, script: "detail.js" });
                }
            });
            if (recList.length > 0) {
                suggests.push({ title: "推荐小说", input: JSON.stringify(recList), script: "toc.js" });
            }
        }
        return Response.success({
            name: name,
            cover: "https://i.imgur.com/5BdXa90.png",
            author: author,
            genres: genres,
            description: description,
            detail: tbtls ? tbtls.html() : "",
            host: "https://www.fuxsb.com",
            ongoing: true,
            comment: {
                input: url,
                script: "comment.js"
            },
            suggests: suggests
        });
    }
    return null;
}