function execute(key, page) {
    let response = fetch('https://www.jx.la/ar.php', {
        method: "GET",
        queries: {
            keyWord : key,
        }
    });

    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("ul.search-list li").forEach(e => {
            let author = e.select("span.author").first().text();
            data.push({
                name: e.select("p.name").first().text().replace(author,"").replace("/","").trim(),
                link: e.select("a").first().attr("href"),
                description: author.replace("/","").trim(),
                host: "https://www.jx.la"
            })
        });

        return Response.success(data);
    }
    return null;
}