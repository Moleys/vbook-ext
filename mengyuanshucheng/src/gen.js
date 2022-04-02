function execute(url, page) {
	url = url.replace('wap.mengyuanshucheng.com', 'www.mengyuanshucheng.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".update_list li").forEach(e => {
            data.push({
                name: e.select(".r_spanone a").first().text(),
                link: e.select(".r_spanone a").first().attr("href"),
                description: e.select(".r_spantwo a").first().text(),
                host: "http://www.mengyuanshucheng.com"
            })
        });


        if (data.length === 0) {
            doc.select("#sitebox dl").forEach(e => {
                data.push({
                    name: e.select("img").first().attr("alt"),
                    link: e.select("h3 a").first().attr("href"),
                    cover: e.select("img").first().attr("src"), 
                    description: e.select("h3").first().text(),
                    host: "http://www.mengyuanshucheng.com"
                })
            }); 
        }

        return Response.success(data)
    }
    return null;
}