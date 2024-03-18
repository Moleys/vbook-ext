load('config.js');
function execute(url, page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (!page) page = '1';
    let url1 = url + "?page=" + page;
    let response = fetch(url1);
    if (response.ok) {
        let data = [];
        let doc = response.html();
        let el = doc.select(".list-view .R_list")
        el.forEach(e => {
            data.push({
                name: e.select(".book_name").text(),
                link: e.select(".book_name a").attr("href"),
                cover:  e.select(".book_cover img").attr("src"),
                description: e.select(".book_author").text(),
                host: BASE_URL
            });
        });
        let eee = doc.select(".page a.num").size()

        let next =  doc.select(".page a.num").get(eee-2).attr("href").split("page=")[1]
        return Response.success(data, next)
    }
    return null;
}