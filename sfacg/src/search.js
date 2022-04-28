function execute(key, page) {
    let response = fetch("http://s.sfacg.com/?Key="+ key +"&S=1&SS=0");

    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("table.comic_cover").last().select("ul").forEach(e => {
            data.push({
                name: e.select("img").first().attr("alt"),
                link: e.select("a").first().attr("href"),
                cover: "https:" + e.select("img").first().attr("src"),
                description: e.select("li").get(1).text().trim().split("综合信息：")[1].split("/")[0],
                host: "http://book.sfacg.com"
            })
        });

        return Response.success(data);
    }
    return null;
}