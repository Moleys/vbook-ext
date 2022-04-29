function execute(url, page) {
    url = url.replace('m.fuxsb.com', 'www.fuxsb.com').replace('m.fuxsb.cc', 'www.fuxsb.com').replace('www.fuxsb.com', 'www.fuxsb.com');
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    if(!page) page='0'

    let response = fetch(url+ page+ ".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(下一页)").first().attr("href").replace(".html","").split(/[- ]+/).pop()
		doc.select(".list_article ul li").forEach(e => {
            data.push({
                name: e.select("h2").first().text().split("作者：")[0].trim(),
                link: e.select("h2 a").first().attr("href"),
                description:e.select("h2").first().text().split("作者：")[1].trim(),
                host: "http://www.fuxsb.com"
            })
        });
        return Response.success(data, next)
    }
    return null;
}