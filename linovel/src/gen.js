function execute(url, page) {
    if(!page) page = '1';
    let response = fetch("https://www.linovel.net/cat/"+url+".html?sort=hot&page="+page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".rank-book-list .rank-book").forEach(e => {
            data.push({
                name: e.select(".book-name").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select(".book-cover img").attr("src"),
                description: e.select(".book-extra").first().text(),
                host: "https://www.linovel.net"
            })
        });

        let next = doc.select("ul.pagination li a").last().attr("href").split("page=")[1]
        return Response.success(data,next)
    }
    return null;
}