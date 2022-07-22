function execute(url, page) {
    if (!page) page = '1';
    const doc = Http.get('https://www.babayu.com/'+url).params({page: page}).html();

    var next = doc.select(".pagination").select("li.active + li").text()

    const el = doc.select("ul.search-list li")

    const data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
            name: e.select("h3").first().text(),
            link: e.select("a").first().attr("href"),
            cover: e.select("img").first().attr("src"),
            description: e.select(".author").first().text().replace('作者：',''),
            host: "https://www.babayu.com"
        })
    }

    return Response.success(data, next)
}