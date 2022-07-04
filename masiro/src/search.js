function execute(key, page) {
    if(!page) page = '1';
    let url1 = "https://masiro.me/admin/loadMoreNovels?page=" + page +"&keyword=" + key;
    let response = fetch(url1);
    if (response.ok) {
        let doc = response.json();
        doc = doc.html
        doc = Html.parse(doc) 
        const data = [];
		doc.select(".layui-card").forEach(e => {
            data.push({
                name: e.select(".layui-card-header").first().text(),
                link: "https://masiro.me" + e.select("a").first().attr("href"),
                cover: "https://masiro.me" + e.select(".n-img").first().attr("lay-src"),
                description: e.select(".author").first().text().replace("作者: ",""),
                host: "https://masiro.me"
            })
        });

        let next = parseInt(page,10) + 1;
        return Response.success(data, next)
    }
    return null;
}