load('config.js');
function execute(url, page) {
    if (!page) page = '1';
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);


    // function execute(url, page) {
    //     if (!page) page = '1';
    //     url = url.replace('m.31bz.org', 'www.31bz.org').replace('s.31bz.org', 'www.31bz.org');
    if (url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url + "page_" + page + ".html");
    if (response.ok) {
        let doc = response.html();
        var next = doc.select(".pages li a").last().attr("href").split(/[/ ]+/).pop().replace("page_", "").replace(".html", "");
        const data = [];
        doc.select("#sitebox dl").forEach(e => {
            data.push({
                name: e.select("h3 a").first().text().replace("《", "").replace("》", ""),
                link: e.select("a").first().attr("href"),
                cover: BASE_URL + e.select("img").first().attr("data-original"),
                description: e.select(".book_other").get(1).text(),
                host: BASE_URL,
            })
        });

        return Response.success(data, next)
    }
    return null;
}