function execute(url) {
	url = url.replace('m.shumilou.co', 'www.shumilou.co');
    let response = fetch("https://www.shumilou.co"+ url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#content_1").last()
        let el = el1.select("a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.text(),
                url: "http://www.shumilou.co" + e.attr("href"),
                host: "http://www.shumilou.co"
            })
        }
        return Response.success(data);
    }
    return null;
}