function execute(url) {
	url = url.replace('m.ibiquge.net', 'www.ibiquge.net');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#list").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 12;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.ibiquge.net" + e.attr("href"),
                host: "http://www.ibiquge.net"
            })
        }
        return Response.success(data);
    }
    return null;
}