function execute(url) {
    if (typeof host !== "undefined"  && host.includes("api-fanqienovel.sunianyun.live")) {
        let item_id = url.split("item_id=")[1]
        let response_host = fetch("http://list.api-fanqienovel.sunianyun.live/random?item_id=" + item_id)
        if (response_host.ok) {
            url = response_host.text() + "/content?item_id=" + item_id
        }
    }
    
    let response_chapter_info = fetch(url)
    if (response_chapter_info.ok) {
        let json = response_chapter_info.json();
        let chapter_info = json.data.data.content.replace(/<br\s*\/?>|\n/g, "<br><br>");
        return Response.success(chapter_info);
    }
    return Response.error("Kiểm tra lại app Fanqie");



}

