function execute(url, page) {
    if(!page) page = '1';
    let response = fetch(url.replace(".html","")+"/" +page+ ".html");
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
		doc.select(".panel-body .row .caption").forEach(e => {
            data.push({
                name: e.select("h4 a").first().text(),
                link: e.select("h4 a").first().attr("href"),
                description: e.select("small").first().text().split(" / 著")[0],
                host: "https://www.po18gv.vip"
            })
        });
        let next = doc.select("#pagelink").select("li.active + li").first().text();
        return Response.success(data, next);    
    }
    
    return null;
}