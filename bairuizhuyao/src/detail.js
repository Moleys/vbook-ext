function execute(url) {
    url = url.replace('m.bairuizhuyao.com', 'www.bairuizhuyao.com');
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".imgbox img").first().attr("src");
        let author  = doc.select(".info p").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select(".info h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".desc").text(),
            detail: "作者：" + author + "<br>" +doc.select(".xs-show").html(),
            host: "http://www.bairuizhuyao.com"
        });
    }
    return null;
}