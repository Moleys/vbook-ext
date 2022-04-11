function execute(url, page) {
    if(!page) page = '1';

    let response = fetch(url + "?page=" + page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let ele0 = doc.select("ul.pagination li.page-item a.page-link").last();
        let next = ""
        next = ele0.select("a").attr("href").replace("?page=","");
        let ele1  = doc.select(".lastest-updates-container .lastest-updates-card");
		ele1.forEach(e => {
            data.push({
                name: e.select(".novel-detail h2").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select("img.top-n-img").attr("src"),
                description: e.select(".novel-detail div").first().text(),
                host: "https://www.vietnovel.com"
            })
        });


        return Response.success(data, next);
    }
    return null;
}