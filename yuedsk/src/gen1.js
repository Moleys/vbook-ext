function execute(url, page) {
	url = url.replace('m.yuedsk.com', 'www.yuedsk.com');
    let response = fetch("http://www.yuedsk.com/");
    if (response.ok) {
        let doc = response.html();
        const data = [];

		doc.select(".blockcontent ul li.fl").forEach(e => {
            data.push({
                name: e.select("a.pop").first().text(),
                link: e.select("a.pop").first().attr("href"),
                description: e.select("a").last().text(),
                host: "http://www.yuedsk.com"
            })
        });


        return Response.success(data)
    }
    return null;
}