function execute(url, page) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    if (!page) {
        page = '1';
    }
    let response = fetch(url + "/" + page + "/");
    console.log(url + "/" + page + "/")
    if (response.ok) {
        let doc = response.html();

        let bookList = [];
        let next = doc.select("#pagelink").select("strong + a").text();
        doc.select("#container div.box").forEach(e => {
            bookList.push({
                name: e.select("a.booktitle").first().text(),
                link: e.select("a.booktitle").first().attr("href"),
                cover: e.select("img.lazy").first().attr("src"),
                description: e.select("a").get(1).text(),
                host: "https://www.kenshuzw.com"
            });
        })
        return Response.success(bookList, next);
    }

    return null;
}