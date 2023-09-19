function execute(url, page) {
	url = url.replace('wap.mengyuanshuchengcn.com', 'www.mengyuanshuchengcn.com');
    if (!page) page = '1';
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch("https://www.mengyuanshuchengcn.com" + url + page + ".html");
    console.log("https://www.mengyuanshuchengcn.com" + url + page + ".html")
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(>)").attr("href").split(/[/ ]+/).pop().replace(".html","").replace(".htm","")
		doc.select(".list_main li").forEach(e => {
            data.push({
                name: e.select(".book-mid-info p.t a").first().text().replace("《","").replace("》",""),
                link: "https://www.mengyuanshuchengcn.com" + e.select(".book-mid-info p.t a").first().attr("href"),
                cover: "https://raw.githubusercontent.com/duongden/vbook/main/nocover.png",
                description: e.select("p.author").first().text(),
                host: "https://www.mengyuanshuchengcn.com"
            })
        });

        return Response.success(data,next)
    }
    return null;
}