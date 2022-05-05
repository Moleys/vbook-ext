function execute(key, page) {
    let response = fetch('https://www.biquge123.cc/ar.php', {
        method: "GET",
        queries: {
            keyWord : key,
        }
    });

    if (response.ok) {
        let doc = response.html();
        const data = [];       
		doc.select(".txt-list-row5 li").forEach(e => {
            let name = e.select(".s2 a").first().text();
            if (name.length !== 0) {
                data.push({
                    name: name,
                    link: "http://www.biquge123.cc" + e.select(".s2 a").first().attr("href"),
                    description: e.select(".s3 a").first().text(),
                    host: "http://www.biquge123.cc"
                })
            }
        });

        return Response.success(data);
    }
    return null;
}