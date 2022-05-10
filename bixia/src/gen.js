function execute(url, page) {
	url = url.replace('m.bixia.org', 'www.bixia.org');
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
                host: "http://www.bixia.org"
            })
        });


        return Response.success(data)
    }
    return null;
}