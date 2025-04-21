load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".book-layout img.book-cover").first().attr("src");
        let author  = doc.select(".book-layout .book-rand-a span").first().text();
        let name = doc.select("h2.book-title").text();
        let type = "chinese_novel"
        if(name.includes("(漫画)") || name.includes("（漫画）") )
        {
            type = "comic"
        }
        return Response.success({
            name: name,
            cover: coverImg,
            author: author,
            description: doc.select("#bookSummary content").html(),
            detail: "作者：" + author + "<br>" +doc.select(".book-meta").get(1).text(),
            host: "http://www.bairuizhuyao.com",
            type: type
        });
    }
    return null;
}