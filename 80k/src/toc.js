function execute(url) {
	url = url.replace('m.80k.net', 'www.80k.net');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#chapterList").last()
        let el = el1.select(".chapter-item a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.80k.net" + e.attr("href"),
                host: "http://www.80k.net"
            })
        }
        return Response.success(data);
    }
    return null;
}