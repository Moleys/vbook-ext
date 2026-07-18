function execute(url) {
    var bookidRegex = /bookid=(\d+)/;
    var match = String(url || "").match(bookidRegex);
    if (!match) return Response.error("Cannot detect book id");
    var resourceid = match[1];
    var url_catalog = "https://novel.html5.qq.com/cgi-bin/novel_reader/catalog?book_id=" + resourceid
    var response = fetch(url_catalog, {"headers":{"Referer":"https://bookshelf.html5.qq.com/qbread/adread/catalog"}})
    if (response.ok) {
        var doc = response.json();
        var el = doc.catalog || [];
        var data = [];
        for (var i = 0;i < el.length; i++) {
            var link = "https://bookshelf.html5.qq.com/qbread/api/wenxue/buy/ad-chapter/v3?resourceid="+ resourceid +"&serialid="+ el[i].serial_id +"&apn=1&readnum=1&duration=2&srcCh="
            data.push({
                name: el[i].serial_name,
                url: link,
                host: "https://bookshelf.html5.qq.com"
            })
        }
        return Response.success(data);
    }
    return null;
}
