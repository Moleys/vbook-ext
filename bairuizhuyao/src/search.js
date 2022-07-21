function execute(key, page) {
    let response = fetch('http://www.bairuizhuyao.com/ar.php?keyWord='+key);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        console.log(doc)
		doc.select(".txt-list-row5 li").forEach(e => {
            let name = e.select(".s2 a").first().text();
            if(name){
                data.push({
                    name: name,
                    link: "http://www.bairuizhuyao.com" + e.select(".s2 a").first().attr("href"),
                    description: e.select(".s3 a").first().text(),
                    host: "http://www.bairuizhuyao.com"
                })
            }
        });

        return Response.success(data);
    }
    return null;
}