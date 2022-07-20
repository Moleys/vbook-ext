function execute(url, page) {
    if(!page) page = '1';
    let response = fetch(url+"?page="+page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("div.articleList p").forEach(e => {
            data.push({
                name: e.select("a").first().text(),
                link: "https://yazhouse8.com/" + e.select("a").first().attr("href"),
                description: "",
                host: "https://yazhouse8.com"
            })
        });
        let next = doc.select("nav ul.pager li a").last().attr("href").split("?page=")[1];
        return Response.success(data, next)
    }
    return null;
}