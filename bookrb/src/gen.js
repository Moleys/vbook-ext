function execute(url, page) {
    if(url.indexOf("1_1") === -1)
        url = url + "/"

	url = url.replace('m.bookrbx.com', 'www.bookrbx.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
		doc.select("#newscontent .l li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.bookrbx.com"
            })
        });


        return Response.success(data)
    }
    return null;
}