function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".bookimg2 img").first().attr("src");
        let author =  doc.select(".booknav2 p").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select(".booknav2 h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".navtxt").html(),
            detail:  doc.select(".booknav2 p").html(),
            host: "https://520banxia.com"
        });
    }
    return null;
}