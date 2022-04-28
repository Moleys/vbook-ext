function execute(url, page) {
    if(!page) page='1'
    let response = fetch(url+"&PageIndex=" + page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".list_tabs ul.Comic_Pic_List").forEach(e => {
            data.push({
                name: e.select("img").first().attr("alt"),
                link: e.select("a").first().attr("href"),
                cover: e.select("img").first().attr("src"),
                description: e.select("a").get(2).text(),
                host: "https://book.sfacg.com"
            })
        });
        let next = doc.select("li.pagebarNext a").attr("href").split(/[= ]+/).pop();
        // let next = (parseInt(page) + 1).toString();
        return Response.success(data, next)
    }
    return null;
}