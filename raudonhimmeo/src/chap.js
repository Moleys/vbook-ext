
function execute(url) {
    const regex = /\/site\/(\w+)\/(\d+)\/(\d+)/;
    const matches = url.match(regex);
    const [_, site, book_id, chap_id] = matches;
    // "https://raudo.nhimmeo.cf/api/" + site + "/chap.php?q=" + e.url + "&k=" + book_id
    let response_chapter_info = fetch("https://raudo.nhimmeo.cf/api/" + site + "/chap.php?q=" + chap_id + "&k=" + book_id)
    if (response_chapter_info.ok) {
        let text_encrypt_chapter_info = response_chapter_info.json();
        let chapter_info = text_encrypt_chapter_info.data.content.replace(/<br>/g, "<br><br>").replace(/\n/g, "<br><br>");
        return Response.success(chapter_info);
    }
    return null;
}

