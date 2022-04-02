function execute(url) {
    url = url.replace('m.yuanshuku.com', 'www.yuanshuku.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("#fmimg img").first().attr("data-original");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.yuanshuku.com" + coverImg;
        }
        return Response.success({
            name: doc.select("#info h1").text(),
            cover: coverImg,
            author: doc.select("#info p").first().text().replace(/作\s*者：/g, ""),
            description: doc.select("#intro").text(),
            detail: doc.select("#info p").last().html(),
            host: "http://www.yuanshuku.com"
        });
    }
    return null;
}