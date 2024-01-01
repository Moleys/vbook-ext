
load('config.js');
function execute(url, page) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".books-list li").forEach(e => {
            data.push({
                name: e.select("h3.weui-flex__item").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select("a img").attr("src"),
                description: e.select(".type span").first().text(),
                host: BASE_URL
            })
        });


        return Response.success(data)
    }
    return null;
}