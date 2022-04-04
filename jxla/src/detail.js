function execute(url) {
    url = url.replace('m.jx.la', 'www.jx.la');
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".img img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.jx.la" + coverImg;
        }
        return Response.success({
            name: doc.select("h2.name").text(),
            cover: coverImg,
            author: doc.select(".info p.author").first().text().replace(/作\s*者：/g, ""),
            description: doc.select(".book-intro").text(),
            detail: doc.select(".info p").html(),
            host: "http://www.jx.la"
        });
    }
    return null;
}