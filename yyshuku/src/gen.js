function execute(url, page) {
	url = url.replace('m.yyshuku.com', 'www.yyshuku.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("tbody tr").forEach(e => {
            data.push({
                name: e.select("td a").first().text(),
                link: e.select("td a").first().attr("href"),
                description: e.select("td a").last().text(),
                host: "http://www.yyshuku.com"
            })
        });


        return Response.success(data)
    }
    return null;
}