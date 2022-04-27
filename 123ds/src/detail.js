function execute(url) {
    url = url.replace('m.paoshu8.com', 'www.paoshu8.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("#fmimg img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.paoshu8.com" + coverImg;
        }
        let author =  doc.select("#info p").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select("#info h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select("#intro").text(),
            detail: "作者： " + author + "<br>" + doc.select("#info p").last().text(),
            host: "http://www.paoshu8.com"
        });
    }
    return null;
}