function execute(key, page) {
    if (!page) page = '1';
    let response = fetch('https://www.hetushu.com/book/search.php', {
        method: "GET",
        queries: {
            keyword : key,
            page : page
        }
    });

    if (response.ok) {
        let doc = response.html();
        const data = [];
        var next = "";
        next = doc.select("a.other.next").first().attr("href").split("&page=")[1];
        
		doc.select(".list dd").forEach(e => {
            data.push({
                name: e.select("h4 a").first().text(),
                link: e.select("h4 a").first().attr("href"),
                cover: "https://www.hetushu.com" + e.select("img").first().attr("src"),
                description: e.select("h4 span").first().text().replace(/\//g,"").trim(),
                host: "https://www.hetushu.com"
            })
        });

        return Response.success(data, next);
    }
    return null;
}