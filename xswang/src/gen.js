function execute(url, page) {
    if(!page) page = '1';
    if(url.slice(-1) !== "/")
        url = url + "/";
	url = url.replace('www.xswang.com', 'm.xswang.com');
    console.log(url+page+".html")
    let response = fetch(url+page+".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a#nextPage").first().attr("href").split(/[/ ]+/).pop().replace(".html","")
        
		doc.select(".main.fiex-main div.common-list").forEach(e => {
            data.push({
                name: e.select("p.title").first().text(),
                link: e.select(".bookimg a").first().attr("href"),
                cover: "https://m.xswang.com" + e.select(".bookimg a img.lazy").first().attr("data-original"),
                description: e.select("p.author").first().text(),
                host: "http://www.xswang.com"
            })
        });

        return Response.success(data,next)
    }
    return null;
}