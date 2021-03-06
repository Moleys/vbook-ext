function execute(url, page) {
	url = url.replace('wap.mengyuanshucheng.com', 'www.mengyuanshucheng.com');
    if (!page) page = '1';
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url + page + ".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        var next = doc.select("#pagelink a").last().attr("href").split(/[/ ]+/).pop().replace(".html","");
		doc.select("table.grid.searall tbody tr#nr").forEach(e => {
            data.push({
                name: e.select("a").first().text(),
                link: "https://www.mengyuanshucheng.com" + e.select("a").first().attr("href"),
                description: e.select("td.odd").get(1).text(),
                host: "https://www.mengyuanshucheng.com"
            })
        });

        return Response.success(data,next)
    }
    return null;
}