function execute(url) {
    url = url.replace("book.rsilu.com", "www.rsilu.com");
    let response = fetch(url +"/");
    if (response.ok) {
        let doc = response.html('gbk');
        let chapList = [];
        let el = doc.select(".chapterCon a");
        for (let i = el.length - 1; i >= 0; i--) {
            var e = el.get(i);
            chapList.push({
                name: e.text(),
                url: e.attr("href"),
                host: "https://www.rsilu.com"
            })
        }
        return Response.success(chapList);
    }
    return null;
}