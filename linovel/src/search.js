function execute(key, page) {
    let response = fetch("https://www.linovel.net/search/index?kw="+key);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".rank-book-list .search-book").forEach(e => {
            data.push({
                name: e.select(".book-name").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select(".book-cover img").attr("src"),
                description: e.select(".book-extra").first().text(),
                host: "https://www.linovel.net"
            })
        });

        return Response.success(data)
    }
    return null;
}