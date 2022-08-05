function execute(key, page) {
    if (!page) page = '1';
    let response = fetch("https://m.aixdzs.com/search/?k="+ key +"&page=" + page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("ul.ix-list li").forEach(e => {
            data.push({
                name: e.select("h3").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select("img").first().attr("src"),
                description: e.select(".book-author").first().text(),
                host: "https://m.aixdzs.com"
            })
        });
        let next = doc.select("#pager a.pager-r").attr("href").split("?page=")[1];
        return Response.success(data, next)
    }
    return null;
}