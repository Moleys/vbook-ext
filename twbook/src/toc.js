function execute(url) {
	url = url.replace('m.twbook.cc', 'www.twbook.cc');
    url = url + "dir"
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".read").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 12;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.twbook.cc" + e.attr("href"),
                host: "http://www.twbook.cc"
            })
        }
        return Response.success(data);
    }
    return null;
}