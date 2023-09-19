function execute(url, page) {
	url = url.replace('wap.mengyuanshuchengcn.com', 'www.mengyuanshuchengcn.com');
    let response = fetch("https://www.mengyuanshuchengcn.com" + url + ".html");
    console.log("https://www.mengyuanshuchengcn.com" + url + ".html")
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".top-list .htop").forEach(e => {
            data.push({
                name: e.select(".book-info a").first().text().replace("《","").replace("》",""),
                link: "https://www.mengyuanshuchengcn.com" + e.select(".book-info a").first().attr("href"),
                cover: e.select(".book-info a img").first().attr("src"),
                description: e.select("span.writer").first().text(),
                host: "https://www.mengyuanshuchengcn.com"
            })
        });

        return Response.success(data)
    }
    return null;
}