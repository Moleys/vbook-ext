function execute(key, page) {
    let response = fetch('https://www.qmxs123.com/s?q='+key);

    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("div.so_list.bookcase div.bookbox").forEach(e => {
            data.push({
                name: e.select("h4.bookname a").first().text(),
                link: e.select("h4.bookname a").first().attr("href"),
                cover: e.select("img").first().attr("src"),
                description: e.select("div.author").first().text().split("作者：")[1].trim(),
                host: "http://www.dxsss.com"
            })
        });

        return Response.success(data);
    }
    return null;
}