load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    const yUrl = url.replace('.html','/catalog');
    let response = fetch(yUrl);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("#catelogX li.chapter-li a.chapter-li-a ");
        const list = [];
        for (var i =0; i < el.size(); i++) {
            var e = el.get(i);
            let link = e.attr("href");
            if(link.includes(".html")){
                list.push({
                    name: e.select(".chapter-index").text(),
                    url: link,
                    host: BASE_URL
                });
            }
        }
        return Response.success(list);
    }
    return null;
}