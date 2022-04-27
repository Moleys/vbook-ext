function execute(url) {
    let response = fetch(url.replace(".html",""));
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("#catalog ul").last().select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "https://520banxia.com"
            })
        }
        return Response.success(data);
    }
    return null;
}