function execute(url) {
	url = url.replace('m.ijjxs.com', 'www.ijjxs.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#list").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 9;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.ijjxs.com" + e.attr("href"),
                host: "http://www.ijjxs.com"
            })
        }
        return Response.success(data);
    }
    return null;
}