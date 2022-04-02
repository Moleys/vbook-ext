function execute(url) {
    url = url.replace('m.jingwubook.com', 'www.jingwubook.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("#fmimg img").first().attr("data-original");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.jingwubook.com" + coverImg;
        }
        return Response.success({
            name: doc.select("#info h1").text(),
            cover: coverImg,
            author: doc.select("#info p").first().text().replace(/作\s*者：/g, ""),
            description: doc.select("#intro").text(),
            detail: doc.select(".hidden-xs").get(2).text(),
            host: "http://www.jingwubook.com"
        });
    }
    return null;
}