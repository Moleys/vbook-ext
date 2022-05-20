function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("main").last()
        let el = el1.select("article header h3 a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: "https://sololeveling.ga" + e.attr("href"),
                host: "https://sololeveling.ga"
            })
        }
        data = data.reverse();
        return Response.success(data);
    }
    return null;
}