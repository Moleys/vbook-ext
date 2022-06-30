function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".chapter-list .chapter a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"https://www.linovel.net" + e.attr("href"),
                host: "https://www.linovel.net"
            })
        }
        return Response.success(data);
    }
    return null;
}