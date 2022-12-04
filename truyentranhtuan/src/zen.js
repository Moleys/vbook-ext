function execute(url, page) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("#new-chapter .manga-focus").forEach(e => {
            data.push({
                name: e.select("span.manga").first().text(),
                link: e.select("a").first().attr("href"),
                description: e.select("span.chapter").text().trim() +" / "+ e.select("span.current-date").text().trim(),
                host: "http://truyentuan.com"
            })
        });
        return Response.success(data)
    }
    return null;
}