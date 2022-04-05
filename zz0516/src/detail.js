function execute(url) {
    url = url.replace('m.zz0516.com', 'www.zz0516.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".lf img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.zz0516.com" + coverImg;
        }
        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: doc.select(".msg em").first().text().replace(/作\s*者：/g, ""),
            description: doc.select(".intro").text(),
            detail: doc.select(".msg em").last().text(),
            host: "http://www.zz0516.com"
        });
    }
    return null;
}