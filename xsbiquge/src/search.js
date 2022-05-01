function execute(key, page) {
    let response = fetch('https://www.xsbiquge.net/search/', {
        method: "GET",
        queries: {
            searchkey : key,
        }
    });

    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("#hotcontent .l .item").forEach(e => {
            data.push({
                name: e.select("dt a").first().text(),
                link: e.select("dt a").first().attr("href"),
                cover: e.select("img.lazy").attr("data-original"),
                description: e.select(".btm a").first().text().trim(),
                host: "https://www.xsbiquge.net"
            })
        });

        return Response.success(data);
    }
    return null;
}