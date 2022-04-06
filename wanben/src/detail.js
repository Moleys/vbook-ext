function execute(url) {
    url = url.replace('m.wanben.org', 'www.wanben.org');
    let response = fetch(url +"/");
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".detailTopLeft img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.wanben.org" + coverImg;
        }
        let author = doc.select(".writer a").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select(".detailTitle h1").first().text(),
            cover: coverImg,
            author: author,
            description: doc.select("table ").first().select("td").last().text(),
            detail: author +"<br>"+ doc.select(".chapterTitle a").html(),
            host: "http://www.wanben.org"
        });
    }
    return null;
}