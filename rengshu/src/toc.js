function execute(url) {
	url = url.replace('m.rengshu.com', 'www.rengshu.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let el1 = doc.select("#list").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "http://www.rengshu.com"
            })
        }
        return Response.success(data);
    }
    return null;
}