function execute(url, page) {
    if (!page) page = '1';
    if(url.slice(-1) !== "/")
        url = url + "/";
	url = url.replace('m.76kanshu.com', 'www.76kanshu.com');
    let response = fetch(url+page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".book-list ul.clearfix li").forEach(e => {
            data.push({
                name: e.select("h5.tit").first().text(),
                link: e.select("h5.tit a").first().attr("href"),
                cover: e.select("a.pic img.lazy").attr("src"),
                description: e.select("p.info span").first().text(),
                host: "http://www.76kanshu.com"
            })
        });
        var next = parseInt(page, 10) + 1;
        return Response.success(data, next)
    }
    return null;
}