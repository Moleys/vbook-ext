function execute(url) {
    url = url.replace('m.piaoyuxuan.com', 'www.piaoyuxuan.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        return Response.success({
            name: doc.select('meta[property="og:novel:book_name"]').attr("content"),
            cover: doc.select('meta[property="og:image"]').attr("content"),
            author: doc.select('meta[property="og:novel:author"]').attr("content"),
            description: doc.select('meta[property="og:description"]').attr("content"),
            detail: doc.select(".pull-left").first().text(),
            host: "http://www.piaoyuxuan.com"
        });
    }
    return null;
}