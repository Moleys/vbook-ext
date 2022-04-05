function execute(url) {
	url = url.replace('m.zz0516.com', 'www.zz0516.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".mulu ul").last()
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.zz0516.com" + e.attr("href"),
                host: "http://www.zz0516.com"
            })
        }
        return Response.success(data);
    }
    return null;
}