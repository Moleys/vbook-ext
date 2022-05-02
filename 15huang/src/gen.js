function execute(url, page) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    if(page){
        url = url +"index_"+ page+".html";
    }

	url = url.replace('m.15huang.com', 'www.15huang.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("div.pages.center a:contains(›)").first().attr("href").split(/[_ ]+/).pop().replace(".html","")

		doc.select("ul.cate-cms.row li.cate-infobox").forEach(e => {
            data.push({
                name: e.select("h4.ellipsis").first().text(),
                link: e.select("a.open.bg-hui-hover").first().attr("href"),
                description: e.select("p.info.hei9.ellipsis span.writer").first().text(),
                cover: e.select("img.lazy.load").first().attr("data-original"),
                host: "https://www.15huang.com"
            })
        });


        return Response.success(data,next)
    }
    return null;
}