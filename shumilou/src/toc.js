function execute(url) {
	url = url.replace('m.shumilou.co', 'www.shumilou.co');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#list").last()
        let el = el1.select("a")
        const data = [];
        let count = 0;
        if(el.size()>10)
            count = 10;

        for (let i = count;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: "http://www.shumilou.co" + e.attr("href"),
                host: "http://www.shumilou.co"
            })
        }
        return Response.success(data);
    }
    return null;
}