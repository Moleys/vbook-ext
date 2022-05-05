function execute(url, page) {
	url = url.replace('m.netxsw.com', 'www.netxsw.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".new-books-list table tbody tr").forEach(e => {
            data.push({
                name: e.select("td a").get(1).text(),
                link: e.select("td a").get(1).attr("href"),
                description: e.select("td a").get(2).text(),
                host: "https://www.netxsw.com"
            })
        });


        return Response.success(data)
    }
    return null;
}