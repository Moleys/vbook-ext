function execute(url) {
	url = url.replace('m.bairuizhuyao.com', 'www.bairuizhuyao.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".section-box").last().select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.bairuizhuyao.com" + e.attr("href"),
                host: "http://www.bairuizhuyao.com"
            })
        }
        return Response.success(data);
    }
    return null;
}