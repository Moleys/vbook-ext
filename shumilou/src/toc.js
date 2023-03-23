function execute(url) {
    url = url.replace('m.shumilouxs.com', 'www.shumilouxs.com');
    let response = fetch("http://www.shumilouxs.com" + url);
    console.log("http://www.shumilouxs.com" + url)
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#content_1").last()
        let el = el1.select("a")
        const data = [];
        for (let i = 0; i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.text(),
                url: "http://www.shumilouxs.com" + e.attr("href"),
                host: "http://www.shumilouxs.com"
            })
        }
        return Response.success(data);
    }
    return null;
}