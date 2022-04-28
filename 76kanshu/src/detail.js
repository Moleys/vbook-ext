function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    if(url.includes("m.76kanshu.com"))
    {
        url = "http://www.76kanshu.com/book/" + url.split(/[/ ]+/).pop();
    }
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".book-info img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.76kanshu.com" + coverImg;
        }
        let author =  doc.select("p.info span").first().text();
        return Response.success({
            name: doc.select("dd h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".intro").html(),
            detail: "作者： " + author + "<br>" + doc.select("p.info span").last().text(),
            host: "http://www.76kanshu.com"
        });
    }
    return null;
}