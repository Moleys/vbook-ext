function execute(key, page) {
    if (!page) page = '1';
    let response = fetch('https://nhasachmienphi.com/page/' + page, {
        method: "GET",
        queries: {
            s : key,
        }
    });

    if (response.ok) {
        let doc = response.html();
        const data = [];
        var next = "";
        next = doc.select("a.nextpostslink").first().attr("href").split(/[/ ]+/).pop();
        

		doc.select(".pd-lr-20 .item_sach").forEach(e => {
            data.push({
                name: e.select("a.title_sach").first().text(),
                link: e.select("a.title_sach").first().attr("href"),
                cover: e.select("img.medium_thum").first().attr("src"),
                host: "http://nhasachmienphi.com"
            })
        });


        return Response.success(data, next);
    }
    return null;
}