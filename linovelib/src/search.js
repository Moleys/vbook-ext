function execute(key, page) {
    let url = ""
    if (!page) {
        url = 'https://w.linovelib.com/S0/?searchkey='+key;
    }
    else {
        url = 'https://w.linovelib.com/S0/' + key + '_' + page + '.html';
    }
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        console.log(doc)
		doc.select("ol.book-ol li.book-li").forEach(e => {
            let name = e.select("h4.book-title").first().text();
            if(name){
                data.push({
                    name: name,
                    link: "http://w.linovelib.com" + e.select("a").first().attr("href"),
                    description: e.select(".book-author").first().text().split("作者 ")[1],
                    cover: e.select("img.book-cover").first().attr("data-original"),
                    host: "http://w.linovelib.com"
                })
            }
        });
        let next = doc.select("#pagelink a.next").attr("href").split("_")[1].replace(".html","")
        return Response.success(data, next);
    }
    return null;
}