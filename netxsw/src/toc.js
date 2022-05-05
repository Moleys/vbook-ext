function execute(url) {
	url = url.replace('m.netxsw.com', 'www.netxsw.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".d-chapter-list").last().select("dd a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"https://www.netxsw.com" + e.attr("href"),
                host: "https://www.netxsw.com"
            })
        }
        return Response.success(data);
    }
    return null;
}