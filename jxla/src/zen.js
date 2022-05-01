function execute(url, page) {
    if(url.slice(-1) !== "/")
        url = url + "/";
	url = url.replace('m.jx.la', 'www.jx.la');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let ele1 = doc.select(".list-1 li")

        ele1.forEach(e => {
            let name = e.select("h3.name").first().text();
            if(name.length !== 0){
                data.push({
                    name: name,
                    link: e.select("a.img").first().attr("href"),
                    cover: e.select("a.img img").attr("data-src"),
                    description: e.select("p.author").last().text(),
                    host: "http://www.jx.la"
                })
            }

        });


        return Response.success(data)
    }
    return null;
}