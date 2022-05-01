function execute(url, page) {
    if(!page) page = '1';
    if(url.slice(-1) !== "/")
        url = url + "/";
	url = url.replace('m.piaoyuxuan.com', 'www.piaoyuxuan.com');
    let response = fetch(url+page+".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next =  doc.select("a[title*=下一页]").first().attr("href").split(/[/ ]+/).pop().replace(".html","")
		doc.select("tbody tr").forEach(e => {
            if(e.select("a").first().text() !== null && e.select("a").first().text() !== '') {
                data.push({
                    name: e.select("td a").first().text(),
                    link: e.select("td a").first().attr("href"),
                    description: e.select("td a").get(1).text(),
                    host: "https://www.piaoyuxuan.com"
                })
            }
        });


        
        return Response.success(data,next)
    }
    return null;
}