function execute(url, page) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    if (!page) {
        page = '1';
    }
    let response = fetch(url + "/" + page + ".htm");
    console.log(url + "/" + page + "/")
    if (response.ok) {
        let doc = response.html();
        doc.select("#novel-list ul li").first().remove();
        let bookList = [];
        let next = doc.select("ul.pagination").select("li a").last().attr("href").replace(".htm","").split(/[/ ]+/).pop();
        doc.select("ul.pagination").remove()
        doc.select("#novel-list ul li").forEach(e => {
            bookList.push({
                name: e.select("a").first().text(),
                link: e.select("a").first().attr("href"),
                description: e.select("div.col-xs-2").first().text(),
                host: "https://www.qiuxiaoshuo.org"
            });
        })
        return Response.success(bookList, next);
    }

    return null;
}