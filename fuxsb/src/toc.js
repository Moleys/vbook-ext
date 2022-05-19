function execute(url) {
    url = url.replace('m.fuxsb.com', 'www.fuxsb.com').replace('m.fuxsb.cc', 'www.fuxsb.com').replace('www.fuxsb.com', 'www.fuxsb.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let total = doc.select("ul").get(1).select("li a").first().text().match(/(\d+)/)[0]
        data.push({
            name: "第1章",
            url: url,
            host: "http://www.fuxsb.com"
        })
        console.log(total)
        for (let i = 2;i <= total; i++) {
            data.push({
                name: "第" + i + "章",
                url: url.replace(".html", "_" + i + ".html"),
                host: "http://www.fuxsb.com"
            })
        }
        return Response.success(data);
    }
    return null;
}