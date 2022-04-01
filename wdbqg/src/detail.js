function execute(url) {
    url = url.replace('m.wdbqg.com', 'www.wdbqg.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".imgbox img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.wdbqg.com" + coverImg;
        }
        return Response.success({
            name: doc.select(".info h1").text(),
            cover: coverImg,
            author: doc.select(".info p").first().text().replace(/作\s*者：/g, ""),
            description: doc.select(".desc").first().text(),
            detail: doc.select(".info p").get(4).text(),
            host: "http://www.wdbqg.com"
        });
    }
    return null;
}