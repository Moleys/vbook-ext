function execute(url) {
    url = url.replace('m.aduosw.com', 'www.aduosw.com').replace('amp.aduosw.com', 'www.aduosw.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".novelinfo-r img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.aduosw.com" + coverImg;
        }
        let detail =  doc.select(".novelinfo-l ul li")
        let author = detail.first().text().replace(/作\s*者：/g, "");
        let updated = detail.last().text()
        return Response.success({
            name: doc.select("div.card h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".body.novelintro").html(),
            detail: "作者： " + author + "<br>" + detail.get(4).text() + "<br>" + updated,
            host: "http://www.aduosw.com"
        });
    }
    return null;
}