function execute(url) {
    const bookidRegex = /bookid=(\d+)/;
    const match = url.match(bookidRegex);
    const bookid = match[1];
    let url2 = "https://bookshelf.html5.qq.com/qbread/api/novel/intro-info?bookid=" + bookid
    let response = fetch(url2, {
        "headers":
        {
        "user-agent":"Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.101 Mobile Safari/537.36",
        "Referer":"https://bookshelf.html5.qq.com/qbread"
        }
    });
    if (response.ok) {
        let doc = response.json();
        let book = doc.data.bookInfo
        let isAdsBook = book.isAdsBook
        console.log(JSON.stringify(book))

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