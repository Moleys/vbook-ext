function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".book-cover img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.linovel.net" + coverImg;
        }
        let author =  doc.select(".author-frame .name").first().text().replace(/作\s*者：/g, "");
        let detail = doc.select(".book-cats").text()
        return Response.success({
            name: doc.select("h1.book-title").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".about-text.text-content-actual").html(),
            detail: "作者： " + author + "<br>" + doc.select(".book-data span").first().text() + " 字数"+ "<br>" + detail,
            host: "https://www.linovel.net"
        });
    }
    return null;
}