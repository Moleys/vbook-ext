function execute(key, page) {
    if(!page) page = '1';
    let response = fetch('https://koushoku.org/search?q='+key+"&page="+page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("nav.pagination ul li a.next").attr("href").replace("?page=","");
		doc.select(".entries article.entry").forEach(e => {
            let coverImg = e.select("figure.thumbnail img").first().attr("src")
            data.push({
                name: e.select("h3.title").first().text(),
                link: "https://koushoku.org" + e.select("a").first().attr("href"),
                cover:  coverImg,
                description: e.select(".artists").first().text(),
                host: "https://koushoku.org"
            })
        });

        return Response.success(data,next);
    }
    return null;
}