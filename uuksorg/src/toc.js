function execute(url) {
	url = url.replace('m.uuks.org', 'www.uuks.org');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".zhangjie").last()
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: 'https://www.uuks.org'+e.attr("href"),
                host: "https://www.uuks.org"
            })
        }
        return Response.success(data);
    }
    return null;
}