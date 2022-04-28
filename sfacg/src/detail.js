function execute(url) {
    url = url.replace('m.sfacg.com/b/', 'book.sfacg.com/Novel/');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".figure .pic img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://book.sfacg.com" + coverImg;
        }
        let author =  doc.select(".author-name").first().text();
        return Response.success({
            name: doc.select(".content .book-title").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".introduce").text(),
            detail: "作者： " + author + "<br>" + doc.select(".count-detail .text-row").first().html(),
            host: "https://book.sfacg.com"
        });
    }
    return null;
}