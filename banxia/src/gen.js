function execute(url, page) {
	url = url.replace('m.banxia.tv', 'www.banxia.tv');
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)

    if (!page) page = '1';
    let response = fetch(url + "/" + page +".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        var next = "";
        doc.select("#pagelink a").last().remove();
        next = doc.select("#pagelink a").last().attr("href").replace(".html","").split(/[/ ]+/).pop();
        

		doc.select("ul.flex li").forEach(e => {
            data.push({
                name: e.select("h2").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select("div.img_span img.lazy").first().attr("data-original"),
                description: e.select(".li_bottom a").first().text(),
                host: "http://www.banxia.tv"
            })
        });

		if (data.length === 0) {
			doc.select(".novelslist2 li").forEach(e => {
                if(e.select("a").first().text() !== null && e.select("a").first().text() !== '') {
                    data.push({
                        name: e.select("a").first().text(),
                        link: e.select("a").first().attr("href"),
                        description: e.select(".s3 a").first().text(),
                        host: "http://www.banxia.tv"
                    })
			    }
            }
            ); 
		}


        return Response.success(data, next);
    }
    return null;
}