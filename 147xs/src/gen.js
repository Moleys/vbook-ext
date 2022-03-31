function execute(url, page) {
	url = url.replace('m.147xs.org', 'www.147xs.org');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("#newscontent .l li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.147xs.org"
            })
        });

		if (data.length === 0) {
			doc.select(".novellist li").forEach(e => {
				data.push({
					name: e.select("a").first().text(),
					link: e.select("a").first().attr("href"),
					host: "http://www.147xs.org"
				})
			}); 
		}


        return Response.success(data)
    }
    return null;
}