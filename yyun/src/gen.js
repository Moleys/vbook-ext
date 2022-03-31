function execute(url, page) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		var elems = doc.select("#newscontent .l li");
		if (!elems.length) elems = doc.select(".novelslist2 li");
        elems.forEach(e => {

            data.push({
                name: e.select(".s2 a").first().text(),
                link: e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.yyun.net"
            })
        });

        return Response.success(data)
    }
    return null;
}