function execute(url) {
    url = url.replace('m.piaotianzw.com', 'www.piaotianzw.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("#fmimg img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.piaotianzw.com" + coverImg;
        }
        return Response.success({
            name: doc.select("#info h1").text(),
            cover: coverImg,
            author: doc.select("#info p").first().text().replace(/作\s*者：/g, ""),
            description: doc.select("#intro").text(),
            detail: doc.select("#info p").html(),
            host: "https://www.piaotianzw.com"
        });
    }
    return null;
}