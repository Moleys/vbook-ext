function execute(url) {
    url = url.replace('www.aixdzs.com', 'm.aixdzs.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select("div.ix-list-img-square img").first().attr("src");
        let author =  doc.select("div.ix-list-info p a").first().text();
        return Response.success({
            name: doc.select("header h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select("#intro").text(),
            detail: "作者： " + author + "<br>" + doc.select("#info p").last().text(),
            host: "http://m.aixdzs.com"
        });
    }
    return null;
}