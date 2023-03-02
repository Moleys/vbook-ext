function execute(url) {
    const bookidRegex = /bookid=(\d+)/;
    const match = url.match(bookidRegex);
    const bookid = match[1];
    let url2 = "https://bookshelf.html5.qq.com/qbread/api/novel/adbooks/bookinfo?bookid=" + bookid
    let response = fetch(url2, {"headers":{"Referer":"https://bookshelf.html5.qq.com/qbread/adread/catalog"}});
    if (response.ok) {
        let doc = response.json();
        let book = doc.data
        return Response.success({
            name: book.resourceName,
            cover: book.picurl,
            author: book.author,
            description: book.summary.replace(/\n/g,"<br>"),
            detail: "作者： " + book.author + "<br>" + book.subject,
            ongoing: !book.isfinish,
            host: "https://bookshelf.html5.qq.com"
        });
    }
    return null;
}