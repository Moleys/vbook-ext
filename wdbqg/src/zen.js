function execute(url, page) {
    if(!page) page = '1';
	url = url.replace('m.wdbqg.com', 'www.wdbqg.com');
    let response = fetch(url+page+"/");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(下页)").first().attr("href").replace(url,"").replace("/","")
		doc.select(".txt-list-row5 li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.wdbqg.com"
            })
        });

        return Response.success(data,next)
    }
    return null;
}