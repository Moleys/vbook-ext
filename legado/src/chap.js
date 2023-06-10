
function execute(url) {
    let url_chap = url.split("/getBookContent")[1]
    let response_chapter_info = fetch(host + "/getBookContent" + url_chap)
    if (response_chapter_info.ok) {
        let json = response_chapter_info.json();
        let chapter_info = json.data.replace(/\n/g, "<br>");
        return Response.success(chapter_info);
    }
    return Response.error("Kiểm tra lại Web service Legado");
}

