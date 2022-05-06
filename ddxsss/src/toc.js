function execute(url) {
	url = url.replace('m.ddxsss.com', 'www.ddxsss.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".listmain").last()
        el1.select("dd.more").remove();

        let el = el1.select("dd a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: 'https://www.ddxsss.com'+e.attr("href"),
                host: "https://www.ddxsss.com"
            })
        }
        return Response.success(data);
    }
    return null;
}