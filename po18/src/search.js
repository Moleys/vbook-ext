
load('config.js');
load('search0.js');

function execute(key, page) {
    let token = getToken()
    console.log(JSON.stringify(token))

    if (!page) page = '1';
    let url = BASE_URL+"/search/index"
    let response = fetch("https://www.po18.tw/search/index", {
        method: "POST",
        body: {
            "_po18rf-tk001": token,
            "searchtype": "book",
            "name" : key,
            "page" : page
        }
    });
    if (response.ok) {
        const data = [];
		let doc = response.html();
        console.log(doc.html())
        let book_list = doc.select(".result_list .book");
        book_list.forEach(e => {
            data.push({
                name: e.select(".book_name").text(),
                link: e.select(".book_name a").attr("href"),
                cover:  e.select(".book_cover a img").attr("src"),
                description: e.author_name,
                host: BASE_URL
            });
        });
        var next = parseInt(page, 10) + 1;
        return Response.success(data, next)
    }
    return null;
}
