function execute(url, page) {
	url = url.replace('m.zz0516.com', 'www.zz0516.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".lastupdate ul li").forEach(e => {
            data.push({
                name: e.select(".sm a").first().text(),
                link: e.select(".sm a").first().attr("href"),
                description: e.select(".zj a").first().text(),
                host: "http://www.zz0516.com"
            })
        });


		if (data.length === 0) {
            doc.select(".booklist ul li").forEach(e => {
                if(e.select("a").first().text() !== null && e.select("a").first().text() !== '') {
                    data.push({
                        name: e.select(".sm a").first().text(),
                        link: e.select(".sm a").first().attr("href"),
                        description: e.select(".zj a").first().text(),
                        host: "http://www.zz0516.com"
                    })
                }
            });
            

        }
        return Response.success(data)
    }
    return null;
}