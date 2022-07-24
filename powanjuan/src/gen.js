function execute(url, page) {
    url = url.replace('m.powanjuan.cc', 'www.powanjuan.cc')
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
		doc.select(".books div.bk").forEach(e => {
            data.push({
                name: e.select("h3").first().text(),
                link: e.select("a").first().attr("href"),
                description: e.select("p").last().text(),
                host: "http://www.powanjuan.cc"
            })
        });

        return Response.success(data)
    }
    return null;
}