function execute(url) {
    if(url.slice(-1) !== "/")
        url = url + "/";
	url = url.replace('m.biquge123.com', 'www.biquge123.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let linkurl = doc.select('meta[property="og:url"]').attr("content")
        let el = doc.select("div.section-box ul").last().select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: linkurl + e.attr("href"),
                host: "https://www.biquge123.com"
            })
        }
        return Response.success(data);
    }
    return null;
}