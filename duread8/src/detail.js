function execute(url) {
    url = url.replace('m.duread8.com', 'www.duread8.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("img.book-img.lazyload").first().attr("data-original");
        let author =  doc.select(".username.text-primary").first().text()
        return Response.success({
            name: doc.select(".book-info .book-title span").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".book-brief").html().replace(/<p class=\"desc\">/g,"<p>"),
            detail: "作者： " + author + "<br>" + doc.select(".book-info .tag").text().replace(/ /g,","),
            host: "https://www.duread8.com"
        });
    }
    return null;
}