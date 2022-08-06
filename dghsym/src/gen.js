function execute(url, page) {
	url = url.replace('m.dghsym.com', 'www.dghsym.com');
    let response = fetch("https://www.dghsym.com/");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        if(url==="chap"){
            doc.select("div.lastupdate ul.odd li").forEach(e => {
                data.push({
                    name: e.select("a").first().text(),
                    link: e.select("a").first().attr("href"),
                    description: e.select("a.gray").first().text(),
                    host: "http://www.dghsym.com"
                })
            });
        }
        else
        {
            doc.select("ul.popular.odd li").forEach(e => {
                data.push({
                    name: e.select("a").first().text(),
                    link: e.select("a").first().attr("href"),
                    description: e.select("a.gray").first().text(),
                    host: "http://www.dghsym.com"
                })
            });
        }
        return Response.success(data)
    }
    return null;
}