function execute(url, page) {
    if (!page) page = '1';
    const doc = Http.get('https://www.babayu.tv/lists/'+url).params({page: page}).html();
    var next = doc.select(".pagination").select("li.active + li").text()
    const el = doc.select(".books-list ul li")
    const data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
            name: e.select("a > .text").first().text(),
            link: e.select("a").first().attr("href"),
            cover: e.select("img").first().attr("src"),
            description: e.select(".author").first().text().replace('作者：',''),
            host: "https://www.babayu.tv"
        })
    }

    return Response.success(data, next)
}