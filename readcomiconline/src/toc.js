function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("table.listing tr td a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"https://readcomiconline.li" + e.attr("href"),
                host: "https://readcomiconline.li"
            })
        }
        data = data.reverse()
        return Response.success(data);
    }
    return null;
}