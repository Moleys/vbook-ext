function execute(url) {
    url = url.replace('m.ffxs8.com', 'www.ffxs8.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html('gbk');
        let coverImg = doc.select(".cover img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.ffxs8.com" + coverImg;
        }
        let author = doc.select(".descTip p").get(1).text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".descInfo p").text(),
            detail: "作者： " + author + "<br>" + doc.select(".descTip p").last().text(),
            host: "http://www.ffxs8.com"
        });
    }
    return null;
}