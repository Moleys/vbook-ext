function execute(url) {
	url = url.replace('m.38kanshu.com', 'www.38kanshu.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#list").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.38kanshu.com" + e.attr("href"),
                host: "http://www.38kanshu.com"
            })
        }
        return Response.success(data);
    }
    return null;
}