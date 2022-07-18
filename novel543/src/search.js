function execute(key, page) {
    let response = fetch('https://www.novel543.com/search/'+key);

    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("ul.library li.layui-col-lg6").forEach(e => {
            data.push({
                name: e.select("a.bookname").first().text(),
                link: e.select("a.bookimg").first().attr("href"),
                cover: e.select("a.bookimg img").first().attr("src"),
                description: e.select("p").first().text().split("|")[0],
                host: "https://www.novel543.com"
            })
        });

        return Response.success(data);
    }
    return null;
}