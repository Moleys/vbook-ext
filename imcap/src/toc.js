function execute(url) {
	url = url.replace('m.imcap.cn', 'www.imcap.cn');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#ul_all_chapters").last();
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.imcap.cn" + e.attr("href"),
                host: "http://www.imcap.cn"
            })
        }
        return Response.success(data);
    }
    return null;
}