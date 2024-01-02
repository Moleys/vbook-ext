load('config.js');
function execute(key, page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch('https://www.novel543.com/search/'+key);

    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select("ul.list li.media").forEach(e => {
            data.push({
                name: e.select("h3").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select("a img").first().attr("src"),
                description: e.select("p").first().text().split("|")[0],
                host: BASE_URL
            })
        });

        return Response.success(data);
    }
    return null;
}