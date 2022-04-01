function execute(url) {
	url = url.replace('m.twbook.cc', 'www.twbook.cc');
    if(url.slice(-1) !== "/")
        url = url + "/"
    url = url + "dir"
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".read dl").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
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