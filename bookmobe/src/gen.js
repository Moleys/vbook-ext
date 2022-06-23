function execute(url, page) {
	url = url.replace('m.bookmobe.top', 'www.bookmobe.top');
    if(!page) page = '1';
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url +  page + ".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = ""
        next = doc.select("a#next").attr("href").replace(".html","").split(/[/ ]+/).pop();
		doc.select("div.CGsectionTwo-right-content div.CGsectionTwo-right-content-unit").forEach(e => {
            data.push({
                name: e.select("a.title").first().text(),
                link: e.select("a.title").first().attr("href"),
                description: e.select("p").last().text(),
                host: "http://www.bookmobe.top"
            })
        });
        return Response.success(data, next);
    }
    return null;
}