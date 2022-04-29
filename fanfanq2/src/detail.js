function execute(url) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let coverImg = doc.select("#bookImg img").first().attr("src");
        let author = doc.select("h1 span a").text().trim();
        let description = doc.select("p.intro").text().replace(/ /g, "<br>");
        return Response.success({
            name: doc.select("h1 em").last().text(),
            cover: coverImg,
            author: author,
            description: description,
            detail: "作者： " + author,
            host: "http://bbs.fanfanq.com"
        });
    }
    return null;
}