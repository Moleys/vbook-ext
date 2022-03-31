function execute(url) {
	url = url.replace('m.147xs.org', 'www.147xs.org');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("#list dd a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: 'https://www.147xs.org'+e.attr("href"),
                host: "https://www.147xs.org"
            })
        }
        return Response.success(data);
    }
    return null;
}