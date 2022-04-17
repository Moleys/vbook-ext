function execute(url, page) {
	url = url.replace('m.txt520.com', 'www.txt520.com');
    if(!page) page = '1';
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    if(page === '1'){
        url = url + "/index.html";
    }
    else{
        url = url + "/index_" + page +".html";
    }


    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
        let next = "";
        doc.select("ul.page a").last().remove();
        next = doc.select("ul.page a").last().attr("href").replace(".html","").replace("index_","").split(/[/ ]+/).pop();

		doc.select("ul.list li").forEach(e => {
            data.push({
                name: e.select("a.title b").first().text(),
                link: e.select("a.title").first().attr("href"),
                description: e.select("span.pubdate").first().text(),
                host: "http://www.txt520.com"
            })
        });
        return Response.success(data, next);
    }
    return null;
}