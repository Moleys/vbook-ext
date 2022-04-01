function execute(url, page) {
	url = url.replace('m.wdbqg.com', 'www.wdbqg.com');
    let response = fetch(url +"/");
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".txt-list-row5 li").forEach(e => {


            data.push({
                name: e.select(".s2 a").first().text(),
                link: e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.wdbqg.com"
            })
        });


        return Response.success(data)
    }
    return null;
}