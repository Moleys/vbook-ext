
function execute(url) {

    let response_chapter_info = fetch(url)
    if (response_chapter_info.ok) {
        let html = response_chapter_info.html();
        let chapter_info = html.select(".forum-content").html()
        return Response.success(chapter_info);
    }

    return Response.error("Error!");
}

