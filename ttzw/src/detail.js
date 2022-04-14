function execute(url) {
    url = url.replace('m.ttzw.com', 'www.ttzw.com');
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".imgbox img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.ttzw.com" + coverImg;
        }
        doc.select(".fix p").last().remove()
        return Response.success({
            name: doc.select(".top h1").text(),
            cover: coverImg,
            author: doc.select(".fix p").first().text().replace(/作\s*者：/g, ""),
            description: doc.select(".m-desc").text(),
            detail: doc.select(".fix").first().html(),
            host: "http://www.ttzw.com"
        });
    }
    return null;
}