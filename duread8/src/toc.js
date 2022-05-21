function execute(url) {
	url = url.replace('m.duread8.com', 'www.duread8.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("#chapter_list span.chapter_item a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "https://www.duread8.com"
            })
        }
        return Response.success(data);
    }
    return null;
}