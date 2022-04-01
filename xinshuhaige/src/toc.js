function execute(url) {
	url = url.replace('m.xinshuhaige.net', 'www.xinshuhaige.net');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".novel_list").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.xinshuhaige.net" + e.attr("href"),
                host: "http://www.xinshuhaige.net"
            })
        }
        return Response.success(data);
    }
    return null;
}