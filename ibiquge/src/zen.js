function execute(url, page) {
	url = url.replace('m.ibiquge.net', 'www.ibiquge.net');
    if (!page) page = '1';
    let response = fetch(url + page + ".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("#newscontent .l li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: "http://www.ibiquge.net" + e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.ibiquge.net"
            })
        });

        let next = parseInt(page,10)+1;
        return Response.success(data, next.toString());
    }
    return null;
}