function execute(url, page) {
    if(!page) page = '1';
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url+page+"/");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(下一页)").first().attr("href").slice(0, -1).split(/[/ ]+/).pop()
		doc.select("#main .hot_sale").forEach(e => {
            data.push({
                name: e.select("p.title").first().text(),
                link: e.select("a").first().attr("href"),
                description: e.select("p.author").first().text(),
                host: "http://www.mijiashe.com"
            })
        });


        return Response.success(data,next)
    }
    return null;
}