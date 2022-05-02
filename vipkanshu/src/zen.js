function execute(url, page) {
    if(!page) page = '1';
	url = url.replace('m.vipkanshu.vip', 'www.vipkanshu.vip');
    let response = fetch(url+page+".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next =  doc.select("a:contains(下一页)").first().attr("href").split(/[- ]+/).pop().split(/[_ ]+/).pop().replace(".html","")
		doc.select(".up .l li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.vipkanshu.vip"
            })
        });


        return Response.success(data,next)
    }
    return null;
}