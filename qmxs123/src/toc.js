function execute(url) {
	url = url.replace('m.qmxs123.com', 'www.qmxs123.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".listmain").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: 'https://www.qmxs123.com'+e.attr("href"),
                host: "https://www.qmxs123.com"
            })
        }
        return Response.success(data);
    }
    return null;
}