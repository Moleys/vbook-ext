function execute(url) {
	url = url.replace('m.xsbiquge.net', 'www.xsbiquge.net');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#list").last();
        let el = el1.select("a")
        console.log(el1)
        const data = [];
        for (let i = 10;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.xsbiquge.net" + e.attr("href"),
                host: "http://www.xsbiquge.net"
            })
        }
        return Response.success(data);
    }
    return null;
}