function execute(url, page) {
	url = url.replace('m.wanben.org', 'www.wanben.org');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let ele1 = doc.select("tbody").first();
        ele1.select("tr").first().remove();
		ele1.select("tr").forEach(e => {
            data.push({
                name: e.select("td a").first().text(),
                link: e.select("td a").first().attr("href"),
                description: e.select("a").last().text(),
                host: "http://www.wanben.org"
            })
        });


        return Response.success(data)
    }
    return null;
}