function execute(url) {
	url = url.replace('m.banxia.tv', 'www.banxia.tv');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("#ul_all_chapters li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: "https://www.banxia.tv" + e.attr("href"),
                host: "https://www.banxia.tv"
            })
        }
        return Response.success(data);
    }
    return null;
}