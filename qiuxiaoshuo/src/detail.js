function execute(url) {
    url = url.replace('m.qiuxiaoshuo.org/book-', 'www.qiuxiaoshuo.org/book/');
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    if(url.endsWith('.html') === false)
        url = url + ".html";
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("img.img-thumbnail").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.qiuxiaoshuo.org" + coverImg;
        }
        let author =  doc.select("h1 small").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select("h1").text().replace("作者："+author,"").trim(),
            cover: coverImg,
            author: author,
            description: doc.select("p#shot").text(),
            detail: "作者： " + author + "<br>" + doc.select(".list-group-item").get(1).text()+ "<br>" + doc.select(".list-group-item").get(2).text(),
            host: "http://www.qiuxiaoshuo.org"
        });
    }
    return null;
}