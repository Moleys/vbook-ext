
function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1);
    let chapter_id = url.split(/[/ ]+/).pop();
    url = "https://nhimmeo.cf/api/chap.php?q=" + chapter_id;
    let response_chapter_info = fetch(url)
    if (response_chapter_info.ok) {
		let text_encrypt_chapter_info = response_chapter_info.json();
        let chapter_info = text_encrypt_chapter_info.data.chapter_info.txt_content.replace(/\n/g, "<br>").replace(/　　/g, "");
        return Response.success(chapter_info);
    }
    return null;
}

