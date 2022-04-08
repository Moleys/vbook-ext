function execute(url) {
    url = url.replace('m.soshuw.com', 'www.soshuw.com').replace('m.soshuwu.com', 'www.soshuwu.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".book_cover img").first().attr("src");
        if (coverImg.startsWith("//")) {
            coverImg = "https:" + coverImg;
        }
        let author = doc.select("h6").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select("#intro").text(),
            detail: author + "<br>" + doc.select("h5").last().text(),
            host: "http://www.soshuw.com"
        });
    }
    return null;
}