function execute(key, page) {
    let response = fetch('http://www.babayu.com/soshu.html?ss='+key);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        console.log(doc)
		doc.select(".search-list li.item").forEach(e => {
            let name = e.select("h3").first().text();
            if(name){
                data.push({
                    name: name,
                    link: "http://www.babayu.com" + e.select("h3 a").first().attr("href"),
                    description: e.select(".author").first().text().replace("状态：", ""),
                    cover: e.select("img").first().attr("src"),
                    host: "http://www.babayu.com"
                })
            }
        });

        return Response.success(data);
    }
    return null;
}