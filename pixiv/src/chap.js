function execute(url) {
    let response = fetch(url);
    let book_id = url.split("id=")[1]
    console.log(book_id)
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("head meta#meta-preload-data").attr("content")
        htm = htm.replace('\",\"novel\":{\"'+book_id+'\":{\"boo', '\",\"novel\":{\"book_id\":{\"boo')
        let obj = JSON.parse(htm).novel.book_id.content
        console.log(JSON.stringify(obj))
        htm = obj.replace(/\n/g,"<br>");
        return Response.success(htm);
    }
    return null;
}