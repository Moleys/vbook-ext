function execute(url, page) {
	url = url.replace('m.wanbenshuku.com', 'www.wanbenshuku.com');
    if(url.slice(-1) !== "/")
        url = url + "/"
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        if(url.indexOf("/sort/") === -1)
        {
            let ele1 = doc.select(".l").last();
            ele1 = ele1.select("li");
            ele1.forEach(e => {
                data.push({
                    name: e.select(".s2 a").first().text(),
                    link: e.select(".s2 a").first().attr("href"),
                    description: e.select(".s3 a").first().text(),
                    host: "http://www.wanbenshuku.com"
                })
            });
        }
        else {
            let ele1 = doc.select("body").last();
            ele1.select(".item").forEach(e => {
                data.push({
                    name: e.select("a").first().attr("title"),
                    link: e.select("a").first().attr("href"),
                    cover: e.select("img").first().attr("data-original"),
                    description: e.select(".btm").first().text(),
                    host: "http://www.wanbenshuku.com"
                })
            }); 
        }

        return Response.success(data)
    }
    return null;
}