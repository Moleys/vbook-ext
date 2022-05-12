function execute(url) {
	url = url.replace('m.wdbqg.com', 'www.wdbqg.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".section-box").last().select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.wdbqg.com" + e.attr("href"),
                host: "http://www.wdbqg.com"
            })
        }
        return Response.success(data);
    }
    return null;
}