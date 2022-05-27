function execute(key, page) {
    let response = fetch('https://www.mengyuanshucheng.com/search/result.html', {
        method: "GET",
        queries: {
            searchkey : key,
        }
    });

    if (response.ok) {
        let doc = response.html();
        const data = [];
        
		doc.select("div.relative.pt-rank .pt-rank-detail").forEach(e => {
            data.push({
                name: e.select(".fl.title span.fl.mr60 a").first().text(),
                link: "https://www.mengyuanshucheng.com" + e.select(".fl.title span.fl.mr60 a").first().attr("href"),
                description: "",
                host: "https://www.mengyuanshucheng.com"
            })
        });

        return Response.success(data);
    }
    return null;
}