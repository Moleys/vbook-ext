function execute(url) {
    url = url.replace('m.piaoyuxuan.com', 'www.piaoyuxuan.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let author =  doc.select('meta[property="og:novel:author"]').attr("content");
        return Response.success({
            name: doc.select('meta[property="og:novel:book_name"]').attr("content"),
            cover: doc.select('meta[property="og:image"]').attr("content"),
            author: author,
            description: doc.select('meta[property="og:description"]').attr("content"),
            detail: "作者： " + author + "<br>" + doc.select(".pull-left").first().text(),
            host: "https://www.piaoyuxuan.com"
        });
    }
    return null;
}