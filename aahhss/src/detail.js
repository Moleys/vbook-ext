load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL1);
    let response = fetch(url + "/");
    if (response.ok) {
        let doc = response.html();

        let coverImg = doc.select('meta[property="og:image"]').attr("content");
        let descriptionMeta = doc.select('.book-desc').html();
        let novelTitle = doc.select('meta[property="og:novel:book_name"]').attr("content");
        let newChap = doc.select('meta[property="og:novel:latest_chapter_name"]').attr("content");
        let author = doc.select('meta[property="og:novel:author"]').attr("content");
        let novelCategory = doc.select('meta[property="og:novel:category"]').attr("content");
        let status = doc.select('meta[property="og:novel:status"]').attr("content");
        let updateTime = doc.select('meta[property="og:novel:update_time"]').attr("content").replace(/\d\d:\d\d:\d\d/g, "");

        return Response.success({
            name: novelTitle,
            cover: coverImg,
            author: author,
            description: descriptionMeta,
            detail: doc.select(".detail").html().replace(/<dt>/g,"<br>"),
            host: BASE_URL || BASE_URL1
        });
    }
    return null;
}