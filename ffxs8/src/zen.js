function execute(url, page) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    if(page){
        url = url +"index_"+ page+".html";
    }
    url = url.replace('m.ffxs8.com', 'www.ffxs8.com');
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
                cover: "http://www.ffxs8.com" + e.select("img").first().attr("src"),
                host: "http://www.ffxs8.com"
            })
        }); 
		

        return Response.success(data,next)
    }
    return null;
}