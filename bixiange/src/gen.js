function execute(url, page) {
    url = url.replace('m.bixiange.top', 'www.bixiange.top').replace('m.bixiange.me', 'www.bixiange.top').replace('www.bixiange.me', 'www.bixiange.top');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
		doc.select(".books div.bk").forEach(e => {
            data.push({
                name: e.select("h3").first().text(),
                link: e.select("a").first().attr("href"),
                description: e.select("p").last().text(),
                cover: "http://www.bixiange.top" + e.select(".pic img").first().attr("src"),
                host: "http://www.bixiange.top"
            })
        });

        return Response.success(data)
    }
    return null;
}