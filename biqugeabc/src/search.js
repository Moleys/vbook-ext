function execute(key, page) {
    let response = fetch('https://www.biqugeabc.com/search.html?key='+key);

    if (response.ok) {
        let doc = response.html();
        const data = [];       
		doc.select(".txt-list-row5 li").forEach(e => {
            let name = e.select(".s2 a").first().text();
            if (name.length !== 0) {
                data.push({
                    name: name,
                    link: e.select(".s2 a").first().attr("href"),
                    description: e.select(".s3 a").first().text(),
                    host: "http://www.biqugeabc.com"
                })
            }
        });

        return Response.success(data);
    }
    return null;
}