function execute(url, page) {
    if(!page) page = '1';
    if(url.slice(-1) !== "/")
        url = url + "/";
	url = url.replace('m.xsbiquge.net', 'www.xsbiquge.net');
    let response = fetch(url+page+"/");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(>>)").first().attr("href").slice(0, -1).split(/[/ ]+/).pop()
        console.log(next)
		doc.select("#newscontent .l li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.xsbiquge.net"
            })
        });

        return Response.success(data,next)
    }
    return null;
}