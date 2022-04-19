function execute(url) {
    url = url.replace('m.31bz.org', 'www.31bz.org').replace('s.31bz.org', 'www.31bz.org');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".chapterlist").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"https://www.31bz.org" + e.attr("href"),
                host: "https://www.31bz.org"
            })
        }
        return Response.success(data);
    }
    return null;
}