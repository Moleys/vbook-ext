
function execute(url) {
    // let host = 'https://workout-assign-nation-remains.trycloudflare.com'
	let item_id = url.split("item_id=")[1]
    let response_chapter_info = fetch(host + "/content?item_id=" + item_id)
    if (response_chapter_info.ok) {
        let json = response_chapter_info.json();
        let chapter_info = json.data.data.content.replace(/\n/g, "<br>");
        return Response.success(chapter_info);
    }
    return Response.error("Kiểm tra lại app Fanqie");
}

