function execute(url) {
    url = url.replace('m.bixia.org', 'www.bixia.org');
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".img img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.bixia.org" + coverImg;
        }
        let author = doc.select(".info p.author").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select("h2.name").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".book-intro").text(),
            detail: "作者：" + author + "<br>" + doc.select(".info p.type").text() + "<br>" + doc.select(".info p.time").text(),
            host: "http://www.bixia.org"
        });
    }
    return null;
}