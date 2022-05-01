function execute(url, page) {
    if(!page) page = '1';
    if(url.slice(-1) !== "/")
        url = url + "/";
	url = url.replace('m.665txt.com', 'www.665txt.com');
    let response = fetch(url +  page + ".html");
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
        let next = ""
        next = doc.select("a.next").attr("href").replace(".html","").split(/[/ ]+/).pop();
		doc.select("#newscontent .l li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.665txt.com"
            })
        });


        return Response.success(data, next);
    }
    return null;
}