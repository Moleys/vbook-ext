load('config.js');

function execute(url) {
    const regex = /(?:item_id=|\/)(\d+)$/;
    let chapid = url.match(regex)[1]

    url = "https://api.mgz6.cc/content/" + chapid

    let response_chapter_info = fetch(url)
    if (response_chapter_info.ok) {
        let json = response_chapter_info.json();

        let chapter_info = json.data.content.replace(/<br\s*\/?>|\n/g, "<br><br>");
        chapter_info = Html.parse(chapter_info)
        chapter_info = chapter_info.select("article").html()
        return Response.success(chapter_info);
    }
    return Response.error("Kiểm tra lại app Fanqie");


}