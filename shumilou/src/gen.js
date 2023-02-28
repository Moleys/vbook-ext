function execute(url, page) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
	url = url.replace('m.shumilou.co', 'www.shumilou.co');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let ele1 = doc.select("#newscontent li")
        ele1.forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                cover: "https://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/0.png",
                link: e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.shumilou.co"
            })
        }); 
        return Response.success(data)
    }
    return null;
}