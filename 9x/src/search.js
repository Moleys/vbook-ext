load('config.js');

function execute(key, page) {
    let response = fetch('https://novel-api.xiaoppkk.com/h5/search?word=' + key);

    if (response.ok) {
        let doc = response.html();
        const data = [];
        
		doc.select("ul.books-list li").forEach(e => {
            data.push({
                name: e.select("h3").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select("img").attr("src"),
                description: e.select("p.type span").first().text(),
                host: BASE_URL
            })
        });

        return Response.success(data);
    }
    return null;
}