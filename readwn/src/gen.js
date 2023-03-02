function execute(url, page) {
    if(!page) page = "0"
    let response = fetch(url+page+".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("#explore > section > ul li.novel-item").forEach(e => {
            data.push({
                name: e.select("h4").first().text(),
                link: e.select("a").first().attr("href"),
                cover: "https://www.readwn.com" + e.select("img").first().attr("data-src"),
                description: "",
                host: "https://www.readwn.com"
            })
        });
        let next = doc.select("#explore > section > nav > div > ul > li:nth-child(11) > a").attr("href").replace(".html","").split(/[- ]+/).pop()

        return Response.success(data, next)
    }
    return null;
}