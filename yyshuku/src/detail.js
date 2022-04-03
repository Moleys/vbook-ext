function execute(url) {
    url = url.replace('m.yyshuku.com', 'www.yyshuku.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("img.img-thumbnail").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.yyshuku.com" + coverImg;
        }
        return Response.success({
            name: doc.select("h1.col-xs-12").text(),
            cover: coverImg,
            author: doc.select('meta[property="og:novel:author"]').attr("content"),
            description: doc.select(".intro").text(),
            detail: doc.select("table.table tr").first().html(),
            host: "http://www.yyshuku.com"
        });
    }
    return null;
}