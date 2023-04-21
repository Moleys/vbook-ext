
function execute(url) {
    let response_chapter_info = fetch(url)
    if (response_chapter_info.ok) {
        let text_encrypt_chapter_info = response_chapter_info.json();
        let chapter_info = text_encrypt_chapter_info.data.content.replace(/<br>/g, "<br><br>").replace(/\n/g, "<br><br>");
        return Response.success(chapter_info);
    }
    return null;
}

