function execute(url, page) {
    if(!page) page = '1';
	url = url.replace('m.bairuizhuyao.com', 'www.bairuizhuyao.com');
    let response = fetch(url+"/"+page+".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(下一页)").first().attr("href").split(/[/ ]+/).pop().replace(".html","")
        console.log(next)
		doc.select(".txt-list-row5 li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: "http://www.bairuizhuyao.com" + e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.bairuizhuyao.com"
            })
        });
        return Response.success(data,next)
    }
    return null;
}