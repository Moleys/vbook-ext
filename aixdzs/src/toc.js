function execute(url) {
    url = url.replace('www.aixdzs.com', 'm.aixdzs.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        // console.log(doc)
        let el = doc.select("ul.chapter a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: "https://m.aixdzs.com" + e.attr("href"),
                host: "https://m.aixdzs.com"
            })
        }
        return Response.success(data);
    }
    return null;
}