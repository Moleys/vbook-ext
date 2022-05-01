function execute(url) {
    url = url.replace('m.xswang.com', 'www.xswang.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("#fmimg img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.xswang.com" + coverImg;
        }
        let detail = doc.select("#info").first()
        let author = detail.select("p a").first().text().replace(/作\s*者：/g, "").trim()
        let name = detail.select("h1").text()
        detail.select("p").last().remove()
        detail.select("h1").remove()
        return Response.success({
            name: name,
            cover: coverImg,
            author: author,
            description: doc.select("#intro").last().html().split("<br>")[0],
            detail: detail.html(),
            host: "https://www.xswang.com"
        });
    }
    return null;
}