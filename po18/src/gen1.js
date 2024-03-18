load('config.js');
load('search0.js');

function execute(url, page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (!page) page = '1';
    let token = getToken()
    console.log(JSON.stringify(token))

    let response = fetch(url, {
        method: "POST",
        body: {
            "_po18rf-tk001": token,
            'tag': 'all',
            'words': 'all',
            'status': 'all',
            'sort': 'time',
            'new': 'new',
            'tid': '',
            'page': page
        }
    });
    if (response.ok) {
        let data = [];
        let doc = response.html();
        let el = doc.select(".list-view .row")
        el.forEach(e => {
            data.push({
                name: e.select(".l_bookname").text(),
                link: e.select("a.l_bookname").attr("href"),
                description: e.select(".l_author").text(),
                host: BASE_URL
            });
        });
        let next = parseInt(page, 10) + 1
        return Response.success(data, next.toString());
    }
    return null;
}