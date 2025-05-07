load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL1);
    let response = fetch(url + "/");
    if (response.ok) {
        let doc = response.html();
        let chapters = [];
        let el = doc.select(".book-chapter")
        el.select("a").forEach(e => {
            chapters.push({
                name: e.text(),
                url: BASE_URL + e.attr("href"),
                host: BASE_URL || BASE_URL1
            })
        });
        return Response.success(chapters);
    }
    return null;
}