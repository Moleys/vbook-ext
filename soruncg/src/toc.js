function execute(url) {
	url = url.replace('m.soruncg.com', 'www.soruncg.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".section-list.fix").last().select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: "http://www.soruncg.com" + e.attr("href"),
                host: "http://www.soruncg.com"
            })
        }
        return Response.success(data);
    }
    return null;
}