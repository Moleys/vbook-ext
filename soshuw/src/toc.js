function execute(url) {
	url = url.replace('m.soshuw.com', 'www.soshuw.com');
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
                url:"http://www.soshuw.com" + e.attr("href"),
                host: "http://www.soshuw.com"
            })
        }
        return Response.success(data);
    }
    return null;
}