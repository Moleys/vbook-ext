function execute(url, page) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    if(page){
        url = url +"index_"+ page+".html";
    }

	url = url.replace('m.wucuo8.com', 'www.wucuo8.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("div.pageBox a").first().text()

		doc.select("div.row.md.bread.w15-1 div.content-box").forEach(e => {
            data.push({
                name: e.select("h2.title").first().text(),
                link: e.select("a.lazyload1").first().attr("href"),
                description: e.select("p.writer").first().text(),
                cover: e.select("img.lazy").first().attr("data-original"),
                host: "https://www.wucuo8.com"
            })
        });


        return Response.success(data,next)
    }
    return null;
}