function execute(key, page) {
    let response = fetch('https://www.ibiquzw.com/search.html?name='+key);
    if (response.ok) {
        let doc = response.html();
        const data = [];       
        doc.select(".novelslist2 li").forEach(e => {
            if(e.select("a").first().text() !== null && e.select("a").first().text() !== '') {
                data.push({
                    name: e.select("a").first().text(),
                    link: "http://www.ibiquzw.com" + e.select("a").first().attr("href"),
                    description: e.select(".s3 a").first().text(),
                    host: "http://www.ibiquzw.com"
                })
            }
        }); 

        return Response.success(data);
    }
    return null;
}