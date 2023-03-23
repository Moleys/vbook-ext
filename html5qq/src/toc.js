function execute(url) {
    const bookidRegex = /bookid=(\d+)/;
    const match = url.match(bookidRegex);
    const resourceid = match[1];
    let url_catalog = "https://novel.html5.qq.com/cgi-bin/novel_reader/catalog?book_id=" + resourceid
    let response = fetch(url_catalog, {"headers":{"Referer":"https://bookshelf.html5.qq.com/qbread/adread/catalog"}})
    if (response.ok) {
        let doc = response.json();
        let el = doc.catalog
        const data = [];
        for (let i = 0;i < el.length; i++) {
            let link = "https://bookshelf.html5.qq.com/qbread/api/wenxue/buy/ad-chapter/v3?resourceid="+ resourceid +"&serialid="+ el[i].serial_id +"&apn=1&readnum=1&duration=2&srcCh="
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