function execute(url, page) {
	url = url.replace('m.jx.la', 'www.jx.la');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let ele1 = doc.select(".txt-list").first().select("li")
        ele1.forEach(e => {
            data.push({
                name: e.select("a").first().text(),
                link: e.select("a").first().attr("href"),
                description: e.select("a").last().text(),
                host: "http://www.jx.la"
            })
        });


        return Response.success(data)
    }
    return null;
}