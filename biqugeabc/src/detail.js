function execute(url) {
    url = url.replace('m.biqugeabc.com', 'www.biqugeabc.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".imgbox img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.biqugeabc.com" + coverImg;
        }
        let author = doc.select(".info p").first().text().replace(/作\s*者：/g, "")
        console.log(doc.select(".desc").first().text())
        return Response.success({
            name: doc.select(".info h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".desc").first().text().replace(/�/g, ""),
            detail: "作者：" +  author + "<br>" + doc.select("p.xs-show").first().text()+"<br>" + doc.select(".info p").get(4).text(),
            host: "http://www.biqugeabc.com"
        });
    }
    return null;
}