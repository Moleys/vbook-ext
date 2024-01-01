load('config.js');

function execute(url) {
    url = url.replace("book-id-","book-catalog-id-")
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("ul.child-title li")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i).select("a");
            data.push({
                name: e.text(),
                url:BASE_URL + e.attr("href"),
                host: BASE_URL
            })
        }
        return Response.success(data);
    }
    return null;
}