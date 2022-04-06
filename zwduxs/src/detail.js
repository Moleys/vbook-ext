function execute(url) {
    url = url.replace('m.zwduxs.com', 'www.zwduxs.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("#fmimg img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.zwduxs.com" + coverImg;
        }
        let author = doc.select("#info p").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select("#info h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select("#intro").text(),
            detail: author + "<br>" + doc.select("#info p").get(2).html(),
            host: "http://www.zwduxs.com"
        });
    }
    return null;
}