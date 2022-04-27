function execute(url, page) {
    if (!page) page = '1';
    let response = fetch(url + page+ ".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];

        if(page==='1')
            doc = doc.select("#article_list_content");
		doc.select("li").forEach(e => {
            data.push({
                name: e.select(".newnav h3 a").last().text(),
                link: e.select(".newnav h3 a").last().attr("href"),
                cover: e.select("a.imgbox img").first().attr("data-src"),
                description: e.select(".labelbox label").first().text(),
                host: "https://520banxia.com"
            })
        });
        var next = parseInt(page, 10) + 1;
        return Response.success(data, next.toString());
    }
    return null;
}