function execute(url, page) {
	url = url.replace('wap.mengyuanshucheng.com', 'www.mengyuanshucheng.com');
    if (!page) page = '1';
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url + page + ".html");
    if (response.ok) {
        let doc = response.html();
        var next = doc.select("#pagelink a").last().attr("href").split(/[/ ]+/).pop().replace(".html","");
        const data = [];
		doc.select("#sitebox dl").forEach(e => {
            data.push({
                name: e.select("h3 a").first().text().replace("《","").replace("》",""),
                link: "https://www.mengyuanshucheng.com" + e.select("a").first().attr("href"),
                cover: e.select("img").first().attr("src"),
                description: e.select(".book_other").get(1).text(),
                host: "https://www.mengyuanshucheng.com"
            })
        });

        return Response.success(data, next)
    }
    return null;
}