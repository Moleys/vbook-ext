function execute(url) {
    url = url.replace('m.qmxs123.com', 'www.qmxs123.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".cover img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.qmxs123.com" + coverImg;
        }
        let author = doc.select(".small span").first().text().replace(/作\s*者：/g, "")
        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".intro").text(),
            detail: "作者：" + author + "<br>" + doc.select(".small span.last").first().html(),
            host: "https://www.qmxs123.com"
        });
    }
    return null;
}