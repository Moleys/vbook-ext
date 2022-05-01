function execute(url) {
    url = url.replace('m.lanlanguoji.com', 'www.lanlanguoji.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".imgbox img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.lanlanguoji.com" + coverImg;
        }
        let author = doc.select(".info p").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select(".info h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".desc").text(),
            detail: "作者：" + author + "<br>" +doc.select(".fix p").get(4).html(),
            host: "http://www.lanlanguoji.com"
        });
    }
    return null;
}