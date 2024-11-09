load('config.js');

function execute(url, page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (!page) page = '1';
    let url1 = BASE_URL+"/userchap/" + page;
    let response = fetch(url1);
    if (response.ok) {
            let doc = response.html();
            let data = [];
            let el = doc.select("div[hidden]");
            for (let i = 0;i < el.size(); i++) {
                var e = el.get(i);
                let name = e.select("h6").first().text()
                if(name)
                    data.push({
                        name: name,
                        link: BASE_URL + e.select("a").first().attr("href"),
                        cover:  re_cover(e.select("img.lazyload").first().attr("src")),
                        description: e.select("a").last().text(),
                        host: BASE_URL
                    });
            }
        var next  =  parseInt(page, 10) + 1;
        return Response.success(data, next.toString())
    }
    return null;
}