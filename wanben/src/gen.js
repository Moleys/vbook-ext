function execute(url, page) {
    if(!page) page = '1';
	url = url.replace('m.wanben.org', 'www.wanben.org');
    let response = fetch(url+page+".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        var next = doc.select("div.page").select("strong + a").text()
        // console.log(doc.select(".sortList ul li"))
		doc.select(".sortList ul li").forEach(e => {
            data.push({
                name: e.select(".sortPhr h3").first().text(),
                link: e.select(".sortImg a").first().attr("href"),
                cover: e.select(".sortImg img").first().attr("src"),
                description: e.select(".sortPhr .words span").first().text(),
                host: "http://www.wanben.org"
            })
        });

        return Response.success(data,next)
    }
    return null;
}