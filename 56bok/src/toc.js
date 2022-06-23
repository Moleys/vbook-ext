function execute(url) {
	url = url.replace('m.56bok.com', 'www.56bok.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let el = doc.select(".readchapter ul.readlist a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: 'https://www.56bok.com'+ e.attr("onclick").replace("window.open('","").replace("','_self');",""),
                host: "https://www.56bok.com"
            })
        }
        return Response.success(data);
    }
    return null;
}