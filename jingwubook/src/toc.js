function execute(url) {
    if(url.slice(-1) !== "/")
        url = url + "/";
	url = url.replace('m.jingwubook.com', 'www.jingwubook.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("#content_1 a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.jingwubook.com" + e.attr("href"),
                host: "http://www.jingwubook.com"
            });
            
        }
        return Response.success(data);
    }
    return null;
}