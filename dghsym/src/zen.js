function execute(url, page) {
    if(!page) page = '1';
    if(url.slice(-1) !== "/")
        url = url + "/";
	url = url.replace('m.dghsym.com', 'www.dghsym.com');
    let response = fetch(url+page+"/");
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("ul.flex li").forEach(e => {
            data.push({
                name: e.select("h2").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select("img").first().attr("data-original"),
                description: e.select("a").last().text(),
                host: "https://www.dghsym.com"
            })
        });
        doc.select("#pagelink a").last().remove()
        let next = doc.select("#pagelink a").last().attr("href").slice(0, -1).split(/[/ ]+/).pop()
        return Response.success(data,next)
    }
    return null;
}