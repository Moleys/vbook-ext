load('config.js');
function execute(url) {
    let item_id = url.split("item_id=")[1]
    url = config_host2 + "/content?item_id=" + item_id

    let response_chapter_info = fetch(url)
    if (response_chapter_info.ok) {
        let json = response_chapter_info.json();
        let chapter_info = json.data.data.content.replace(/<br\s*\/?>|\n/g, "<br><br>");
        return Response.success(chapter_info);
    }
    return Response.error("Kiểm tra lại app Fanqie");



}

