function execute(url) {
	url = url.replace('m.lanlanguoji.com', 'www.lanlanguoji.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".section-box").last();
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.lanlanguoji.com" + e.attr("href"),
                host: "http://www.lanlanguoji.com"
            })
        }
        return Response.success(data);
    }
    return null;
}