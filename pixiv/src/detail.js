function execute(url) {
    let response = fetch(url);
    let book_id = url.split("id=")[1]
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("head meta#meta-preload-data").attr("content")
        htm = htm.replace('\",\"novel\":{\"'+book_id+'\":{\"boo', '\",\"novel\":{\"book_id\":{\"boo')
        let obj = JSON.parse(htm).novel.book_id
        let author = obj.userName;
        return Response.success({
            name: obj.title,
            cover: obj.coverUrl,
            author: author,
            description: obj.description,
            detail: "作者： " + author,
            host: "https://www.pixiv.net"
        });
    }
    return null;
}