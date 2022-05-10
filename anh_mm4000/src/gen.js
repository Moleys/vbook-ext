function execute(url, page) {
    // url = url.replace(".html","")
    if (!page) page = '1';
    let response = fetch(url + "_"+ page+".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        // var next = doc.select("div.pagelists a").first().attr("href").split(/[_ ]+/).pop().replace(".html","");
        let next = (parseInt(page) + 1).toString()
		doc.select("ul.l-meinv-wrapp.cl li").forEach(e => {
            data.push({
                name: e.select("div.title").first().text(),
                link: "http://www.mm4000.com" + e.select("div.timg a").first().attr("href"),
                cover: e.select("div.timg img").first().attr("data-original"),
                description: e.select("div.times").first().text(),
                host: "http://www.mm4000.com/meinv/"
            })
        });
        return Response.success(data, next);
    }
    return null;
}