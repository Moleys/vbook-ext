function execute(url) {
	url = url.replace('m.biqiudu.com', 'www.biqiudu.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#list").last()
        let el = el1.select("a")
        const data = [];
        let count = 0;
        if(el.size()>12)
            count = 12;

        for (let i = count;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: "http://www.biqiudu.com" + e.attr("href"),
                host: "http://www.biqiudu.com"
            })
        }
        return Response.success(data);
    }
    return null;
}