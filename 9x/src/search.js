function execute(key, page) {
    let response = fetch('https://www.38kanshu.com/search/', {
        method: "GET",
        queries: {
            searchkey : key,
        }
    });

    if (response.ok) {
        let doc = response.html();
        const data = [];
        
		doc.select("tbody tr").forEach(e => {
            data.push({
                name: e.select("td a").first().text(),
                link: e.select("td a").first().attr("href"),
                description: e.select("td.xs-hidden").first().text().replace(/\//g,"").trim(),
                host: "https://www.38kanshu.com"
            })
        });

        return Response.success(data);
    }
    return null;
}