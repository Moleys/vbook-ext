load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL1);
    let response = fetch(BASE_URL + url || BASE_URL1 + url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".book-like a").forEach(e => {
            data.push({
                name: e.select("h4").first().text(),
                link: BASE_URL + e.attr("href"),
                cover: e.select("img").first().attr("src"),
                description: e.select("span").first().text(),
                host: BASE_URL || BASE_URL1
            })
        });
        return Response.success(data)
    }
    return null;
}