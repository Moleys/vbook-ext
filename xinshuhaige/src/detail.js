function execute(url) {
    url = url.replace('m.xinshuhaige.net', 'www.xinshuhaige.net');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".book_cover img").first().attr("src");
        if (coverImg.startsWith("//")) {
            coverImg = "https:" + coverImg;
        }
        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: doc.select("h6").first().text().replace(/作\s*者：/g, ""),
            description: doc.select("#intro").text(),
            detail: doc.select("h5").html(),
            host: "http://www.xinshuhaige.net"
        });
    }
    return null;
}