function execute(url) {
    let book_id = url.split("id=")[1]
    console.log(book_id)

    let response = fetch("https://www.pixiv.net/ajax/novel/"+book_id);
    if (response.ok) {
        let doc = response.json()
        let obj = doc.body.content
        htm = obj.replace(/\n/g,"<br>");
        return Response.success(htm);
    }
    return null;
}