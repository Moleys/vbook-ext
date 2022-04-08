function execute(url, page) {
    if (!page) page = '1';

    var doc = Http.get(url + "/trang-" + page).html();

    if (doc) {
        var el = doc.select(".list-truyen div[itemscope]");
        var novelList = [];
        var next = doc.select(".pagination a").first().text();
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select(".truyen-title > a").text(),
                link: e.select(".truyen-title > a").first().attr("href"),
                description: e.select(".author").text(),
                cover: e.select("[data-image]").attr("data-image"),
                host: "https://truyenfull.org",
            });

        }
        return Response.success(novelList, next);
    }
    return null;
}