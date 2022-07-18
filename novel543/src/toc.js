function execute(url) {
	url = url.replace('m.novel543.com', 'www.novel543.com');
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
                url:"https://www.novel543.com" + e.attr("href"),
                host: "https://www.novel543.com"
            })
        }
        return Response.success(data);
    }
    return null;
}