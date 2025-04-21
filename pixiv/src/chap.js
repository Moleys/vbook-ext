function execute(url) {
    let book_id = url.split("id=")[1]
    console.log(book_id)

    let response = fetch("https://www.pixiv.net/ajax/novel/"+book_id);
    if (response.ok) {
        let doc = response.json()
        let obj = doc.body.content
        let imgs = doc.body.textEmbeddedImages
        obj = obj.replace(/\[uploadedimage:(\d+)\]/g, (match, id) => {
        const img = imgs[id];
        if (img && img.urls && img.urls["1200x1200"]) {
            return `<img src="${img.urls["1200x1200"].replace("https://i.pximg.net","https://i0.wp.com/pximg.perennialte.ch")}" />`;
        }
        return match; // Nếu không tìm thấy ảnh, giữ nguyên tag
        });
        htm = obj.replace(/\n/g,"<br>");
        return Response.success(htm);
    }
    return null;
}