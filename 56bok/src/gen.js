function execute(url, page) {
    if(!page) page = '1';
	url = url.replace('m.56bok.com', 'www.56bok.com');
    let response = fetch(url+"_"+page+".html");
    if (response.ok) {
        let doc = response.html('gbk');
        
        const data = [];
        let next =  "https://www.56bok.com" + doc.select("div.page a").first().attr("href")
        next = next.replace(url+"_","").replace(".html","");
		doc.select(".cover p.line").forEach(e => {
            data.push({
                name: e.select("a").first().text(),
                link: "http://www.56bok.com" + e.select("a").first().attr("href"),
                description: e.select("span").first().text(),
                host: "http://www.56bok.com"
            })
        });


        return Response.success(data,next)
    }
    return null;
}