function execute(url, page) {
	url = url.replace('m.twbook.cc', 'www.twbook.cc');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("tbody tr").forEach(e => {
            data.push({
                name: e.select("td a").get(1).text(),
                link: e.select("td a").get(1).attr("href"),
                description: e.select("td a").get(2).text(),
                host: "http://www.twbook.cc"
            })
        });


        return Response.success(data)
    }
    return null;
}