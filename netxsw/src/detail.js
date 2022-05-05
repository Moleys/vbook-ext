function execute(url) {
    url = url.replace('m.netxsw.com', 'www.netxsw.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("div.fh.d-info-panel img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.netxsw.com" + coverImg;
        }
        let author =  doc.select("ul.fh-f1 li span").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select(".fh-f1 h2").text(),
            cover: coverImg,
            author: author,
            description: doc.select("li .nowrap-3").text(),
            detail: "作者： " + author + "<br>" + doc.select("ul.fh-f1").get(1).select("li").get(1).text(),
            host: "https://www.netxsw.com"
        });
    }
    return null;
}