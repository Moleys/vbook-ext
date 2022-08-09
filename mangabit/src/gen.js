function execute(url, page) {
    if (!page) page = '1';
    let response = fetch( url + "?trang=" +page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".mgb-content-left .mgb-story-card").forEach(e => {
            data.push({
                name: e.select(".mgb-story-title").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select("img").first().attr("data-src"),
                description: e.select(".mgb-story-title-chapter a").first().text(),
                host: "https://mangabit.top"
            })
        });
        doc.select("#paginationContainer a").last().remove()
        let next = doc.select("#paginationContainer a").last().attr("href")
        if(next.includes("?trang="))
            next = next .split("?trang=")[1]
        if(next.includes("&trang="))
            next = next.split("&trang=")[1];
        return Response.success(data, next)
    }
    return null;
}