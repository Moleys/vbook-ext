function execute(url) {
    if(url.slice(-1) !== "/")
        url = url + "/";
	url = url.replace('m.665txt.com', 'www.665txt.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let el = doc.select("#list").last().select("dd a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.665txt.com" + e.attr("href"),
                host: "http://www.665txt.com"
            })
        }
        return Response.success(data);
    }
    return null;
}