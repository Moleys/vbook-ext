function execute(url) {
    url = url.replace("m.kenshuzw.com", "www.kenshuzw.com");
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        var author = doc.select(".authorname").text();
        return Response.success({
            name: doc.select(".booktitle h1").first().text(),
            cover: doc.select(".bookcover-l img").first().attr("src"),
            author: author,
            description: doc.select(".book-intro div").first().html(),
            detail: "作者：" + author + "<br>" + doc.select(".booktitle p a").first().text(),
            host: "https://www.kenshuzw.com"
        });
    }
    return null;
}