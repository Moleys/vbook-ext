function execute(url) {
    const regex = /(?:item_id=|\/)(\d+)$/;
    let chapid = url.match(regex)[1]

    url = "http://fq.travacocro.com/content?item_id=" + chapid

    let response_chapter_info = fetch(url)
    if (response_chapter_info.ok) {
        let json = response_chapter_info.json();
        let chapter_info = json.data.data.content.replace(/<br\s*\/?>|\n/g, "<br><br>");
        return Response.success(chapter_info);
    }
    return Response.error("Kiểm tra lại app Fanqie");




}