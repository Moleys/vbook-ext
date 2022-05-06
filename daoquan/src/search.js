
function execute(key, page) {
    if (!page) page = '1';

    let response = fetch("https://daoquan.vn/tim-kiem-tong-hop?nameSearch="+key+"&page="+page);
    if (response.ok) {
        let doc = response.html();

        var el = doc.select("#rank-view-list ul li");
        var novelList = [];
        var next = doc.select("ul.pagination > li.active + li").select("span").text()
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select("h4 > a").text(),
                link: e.select("h4 > a").attr("href"),
                description: e.select(".author").text(),
                cover: e.select("img").first().attr("src"),
                host: "https://daoquan.vn"
            });

        }

        return Response.success(novelList, next);
    }

    return null;
}
