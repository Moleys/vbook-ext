function execute(url) {
	url = url.replace('m.sjks88.com', 'www.sjks88.com');
    let response = fetch(url);
    if (response.ok) {
        let doc_ch = response.html('gbk');
        let el1 = doc_ch.select(".list").last();
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.sjks88.com" + e.attr("href"),
                host: "http://www.sjks88.com"
            })
        }
        return Response.success(data);
    }
    return null;
}