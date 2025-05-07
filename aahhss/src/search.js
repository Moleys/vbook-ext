load('config.js');
function execute(key,page) {
    let response = fetch("https://www.aakkrr.com/book/" + encodeURIComponent(key));

    if (response.ok) {
        let doc = response.html();
        let books = [];
        doc.select(".grid .grid-item").forEach(e => 
        {
            books.push({
                name: e.select("h3").first().text(),
                link:  e.select("a").attr("href"),
                cover: e.select("img").attr("src"),
                description: "",
                host: BASE_URL
            })
            
        });

        return Response.success(books);
    }

    return null;
}