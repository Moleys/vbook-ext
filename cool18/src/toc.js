function execute(url, page) {
    if(!page) page = '1';

    
    let response = fetch(url + "p=" + page);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".ta-right").last()
        let el = el1.select("div.ta-show-list")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.select("a").first().attr("href"),
                host: "https://www.cool18.com"
            })
        }
        var next = parseInt(page, 10) + 1;

        return Response.success(data, next.toString());
    }
    return null;
}