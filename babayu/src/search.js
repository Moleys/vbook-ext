function execute(key, page) {
    let response = fetch('http://www.babayu.tv/soshu.html?ss='+key);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        console.log(doc)
		doc.select(".search-list li.item").forEach(e => {
            let name = e.select("h3").first().text();
            if(name){
                data.push({
                    name: name,
                    link: "http://www.babayu.tv" + e.select("h3 a").first().attr("href"),
                    description: e.select(".author").first().text().replace("状态：", ""),
                    cover: e.select("img").first().attr("src"),
                    host: "http://www.babayu.tv"
                })
            }
        });

        return Response.success(data);
    }
    return null;
}