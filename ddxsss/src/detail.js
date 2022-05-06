function execute(url) {
    url = url.replace('m.ddxsss.com', 'www.ddxsss.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".cover img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.ddxsss.com" + coverImg;
        }
        let author = doc.select(".small span").first().text().replace(/作\s*者：/g, "")
        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".intro").text(),
            detail: "作者：" + author + "<br>" + doc.select(".small span.last").first().html(),
            host: "https://www.ddxsss.com"
        });
    }
    return null;
}