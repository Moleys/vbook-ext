function execute(url) {
    url = url.replace('m.yuedsk.com', 'www.yuedsk.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".divbox.cf img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.yuedsk.com" + coverImg;
        }
        let author = doc.select("#content > div.divbox.cf > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > a").first().text().replace(/作\s*者：/g, "")
        return Response.success({
            name: doc.select("#content > div.divbox.cf > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)").text(),
            cover: coverImg,
            author: author,
            description: doc.select("#content > div.divbox.cf > div:nth-child(2) > div:nth-child(3) > div.tabcontent > div:nth-child(1) > div").last().html(),
            detail: "作者：" + author,
            host: "http://www.yuedsk.com"
        });
    }
    return null;
}