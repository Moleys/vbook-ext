
load('config.js');

function execute(key, page) {
    if (!page) page = '1';
    let url1 = BASE_URL+"/search/" +key +"/"+ page;
    let response = fetch(url1);
    if (response.ok) {
            let doc = response.html();
            let data = [];
            let el = doc.select(".MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2").last().select(".MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-6.MuiGrid-grid-md-3");
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