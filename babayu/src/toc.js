function execute(url) {
    const idBook = url.match(/\d+/)[0];
    const yUrl = 'https://www.babayu.tv/book_other_'+idBook+'.html';
    let response = fetch(yUrl);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("ul.chapter-list li a");
        const list = [];
        for (var i =0; i < el.size(); i++) {
            var e = el.get(i);
            list.push({
                name: e.text(),
                url: e.attr("href"),
                host: "https://www.babayu.tv"
            })
        }
        return Response.success(list);
    }
    return null;
}