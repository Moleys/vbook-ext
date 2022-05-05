function execute(url, page) {
    if(!page) page = '1';
    let response = fetch(url +"?page="+ page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(下一页)").first().attr("href").split("page=")[1]

		doc.select(".details-l-box div.list-item-panel.fh ").forEach(e => {
            data.push({
                name: e.select("a").first().attr("title"),
                link: e.select("a").first().attr("href"),
                description: e.select("ul.fh-f1 li span").first().text().slice(0, -1).trim(),
                cover: e.select("img").first().attr("src"),
                host: "https://www.netxsw.com"
            })
        });


        return Response.success(data,next)
    }
    return null;
}