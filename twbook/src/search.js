function execute(key, page) {
    let response = fetch('https://www.twbook.cc/search/'+key);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".list .row").forEach(e => {
            data.push({
                name: e.select("h3 a").text(),
                link: e.select("h3 a").attr("href"),
                cover: e.select("img").attr("src"),
                description: e.select(".author").text(),
                host: "http://www.twbook.cc"
            })
        });
        return Response.success(data);
    }
    return null;
}