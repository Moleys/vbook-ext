load('config.js');

function execute(url, page) {
    if (!page) page = '1';
    let currentUrl = BASE_URL + url + "/" + (page === '1' ? 'index.html' : 'index_' + page + '.html');
    console.log(currentUrl)
    let response = fetch(currentUrl);
    
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
            });
        });

        let next = (parseInt(page) + 1).toString();
        return Response.success(data, next);
    }
    return null;
}