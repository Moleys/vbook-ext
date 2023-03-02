function execute(url) {
    const bookidRegex = /bookid=(\d+)/;
    const match = url.match(bookidRegex);
    const bookid = match[1];
    let url2 = "https://bookshelf.html5.qq.com/qbread/api/novel/adbooks/bookinfo?bookid=" + bookid
    let response = fetch(url2, {"headers":{"Referer":"https://bookshelf.html5.qq.com/qbread/adread/catalog"}});
    if (response.ok) {
        let doc = response.json();
        let serialnum = doc.data.serialnum
        let resourceID = doc.data.resourceID
        let roundedNum = Math.ceil(serialnum/100);
        let start = 1
        const data = [];
        for (let i = 0;i < roundedNum; i++) {
            data.push('https://bookshelf.html5.qq.com/qbread/api/book/list-chapter?resourceid='+resourceID+'&start=' +start + '&count=100&serialnum='+serialnum+'&sort=asc')
            start += 1
        }
        return Response.success(data);
    }
    return null;
}