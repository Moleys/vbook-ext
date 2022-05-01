function execute(url, page) {
    if(!page) page = '1';
	url = url.replace('m.jingwubook.com', 'www.jingwubook.com');
    let response = fetch(url+"/"+page+"/");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(>>)").first().attr("href").slice(0, -1).split(/[/ ]+/).pop()
        let ele1 = doc.select("body").last();
        ele1.select(".item").forEach(e => {
            data.push({
                name: e.select("a").first().attr("title"),
                link: e.select("a").first().attr("href"),
                cover: e.select("img").first().attr("data-original"),
                description: e.select(".btm").first().text(),
                host: "http://www.jingwubook.com"
            })
        }); 

        return Response.success(data,next)
    }
    return null;
}