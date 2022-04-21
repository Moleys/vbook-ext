function execute(url) {
    url = url.replace('m.bixiange.top', 'www.bixiange.top').replace('m.bixiange.me', 'www.bixiange.top').replace('www.bixiange.me', 'www.bixiange.top');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html('gbk');
        let coverImg = doc.select(".cover img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.bixiange.top" + coverImg;
        }
        let author = doc.select(".descTip p").get(1).text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".descInfo p").text(),
            detail: "作者： " + author + "<br>" + doc.select(".descTip p").last().text(),
            host: "http://www.bixiange.top"
        });
    }
    return null;
}