function execute(url, page) {
    if(page) url = "http://truyentuan.com/page/" + page;
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("#story-icon .new-update").forEach(e => {
            data.push({
                name: e.select("a.manga-update-name").first().text(),
                link: e.select("a.manga-update-name").first().attr("href"),
                cover: e.select("img").first().attr("src"),
                description: e.select("a.manga-update-chapter").first().text(),
                host: "http://truyentuan.com"
            })
        });

        let next = doc.select("#page-nav li.right-arrow a").attr("href").slice(0, -1).split(/[/ ]+/).pop()
        return Response.success(data, next)
    }
    return null;
}