function execute(url) {
    url = url.replace('m.aduosw.com', 'www.aduosw.com').replace('amp.aduosw.com', 'www.aduosw.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("ul.dirlist").last().select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"https://www.aduosw.com" + e.attr("href"),
                host: "https://www.aduosw.com"
            })
        }
        return Response.success(data);
    }
    return null;
}