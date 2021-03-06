function execute(url) {
    url = url.replace('m.biqiudu.com', 'www.biqiudu.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("#fmimg img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.biqiudu.com" + coverImg;
        }
        let author =  doc.select("#info p").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select("#info h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select("#intro").html().split("<br>")[0],
            detail: "作者： " + author + "<br>" + doc.select("#info p").get(1).text()+ "<br>" + doc.select("#info p").get(2).text(),
            host: "http://www.biqiudu.com"
        });
    }
    return null;
}