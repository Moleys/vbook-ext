function execute(url, page) {
	url = url.replace('m.ddxsss.com', 'www.ddxsss.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".l li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.ddxsss.com"
            })
        });

		if (data.length === 0) {
			doc.select(".hot div.item").forEach(e => {
                var coverImg = e.select(".image img").first().attr("src");
                console.log(coverImg)
                data.push({
                    name: e.select("a").last().text(),
                    cover: coverImg,
                    link: e.select(".image a").first().attr("href"),
                    description: e.select("dd").first().text(),
                    host: "http://www.ddxsss.com"
                })
			    
            }
            ); 
		}

        return Response.success(data)
    }
    return null;
}