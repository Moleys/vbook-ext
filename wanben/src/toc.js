function execute(url) {
	url = url.replace('m.wanben.org', 'www.wanben.org');
    let response = fetch(url+"/");
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".chapter ul").last()
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.wanben.org" + e.attr("href"),
                host: "http://www.wanben.org"
            })
        }
        return Response.success(data);
    }
    return null;
}