function execute(url, page) {
    url = url.replace('m.ffxs8.com', 'www.ffxs8.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
		doc.select(".books div.bk").forEach(e => {
            data.push({
                name: e.select("h3").first().text(),
                link: e.select("a").first().attr("href"),
                description: e.select("p").last().text(),
                cover: "http://www.ffxs8.com" + e.select(".pic img").first().attr("src"),
                host: "http://www.ffxs8.com"
            })
        });
        
		if (data.length === 0) {
			doc.select("ul.clearfix li").forEach(e => {
                data.push({
                    name: e.select("strong").first().text(),
                    link: e.select("a").first().attr("href"),
                    description: e.select(".descript").first().text(),
                    cover: "http://www.ffxs8.com" + e.select("img").first().attr("src"),
                    host: "http://www.ffxs8.com"
                })
            
            }
            ); 
		}

        return Response.success(data)
    }
    return null;
}