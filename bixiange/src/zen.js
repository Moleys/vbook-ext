function execute(url, page) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    if(page){
        url = url +"index_"+ page+".html";
    }
    url = url.replace('m.bixiange.top', 'www.bixiange.top').replace('m.bixiange.me', 'www.bixiange.top').replace('www.bixiange.me', 'www.bixiange.top');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
        let next  = doc.select("a:contains(下一页)").first().attr("href").split(/[_ ]+/).pop().replace(".html","")

        doc.select("ul.clearfix li").forEach(e => {
            data.push({
                name: e.select("strong").first().text(),
                link: e.select("a").first().attr("href"),
                description: e.select(".descript").first().text(),
                cover: "http://www.bixiange.top" + e.select("img").first().attr("src"),
                host: "http://www.bixiange.top"
            })
        }); 
		

        return Response.success(data,next)
    }
    return null;
}