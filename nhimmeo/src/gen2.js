load('config.js');

function execute(url, page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (!page) page = '1';
    let url1 = BASE_URL+"/userchap/" + page;
    let response = fetch(url1);
    if (response.ok) {
            let doc = response.html();
            let data = [];
            let el = doc.select(".container.center .col-sm-6.col-md-3 .section")
            for (let i = 0;i < el.size(); i++) {
                var e = el.get(i);
                data.push({
                    name: e.select("h5").text(),
                    link: BASE_URL + e.select("a").attr("href"),
                    cover:  e.select("img").attr("data-src"),
                    description: e.select("p").text(),
                    host: BASE_URL
                });
            }

        var next  =  doc.select("#paginationSection a").last().attr("href").split(/[/ ]+/).pop();
        return Response.success(data, next.toString())
    }
    return null;
}