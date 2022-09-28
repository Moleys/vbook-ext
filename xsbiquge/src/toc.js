function execute(url) {
	url = url.replace('m.xsbiquge.net', 'www.xsbiquge.net');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("#content_1 a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.xsbiquge.net" + e.attr("href"),
                host: "http://www.xsbiquge.net"
            });
            
        }
        return Response.success(data);
    }
    return null;
}