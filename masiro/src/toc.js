function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".chapter-content li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a span").first().text(),
                url: "https://masiro.me" + e.attr("href"),
                host: "https://masiro.me"
            })
        }
        return Response.success(data);
    }
    return null;
}