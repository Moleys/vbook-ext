function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let table = doc.select("#oneboolt").first()
        table.select("tr").first().remove();
        table.select("tr").first().remove();
        table.select("tr").first().remove();

        let el = table.select('tr[itemprop="chapter"]');
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);

            let name = e.select("a").first().text().replace(" ","").replace(" ","") + e.select("td").get(2).text();
            let link = e.select("a").first().attr("href");
            if(link === null || link === '') {
                link = "this_is_chapter_vip_" +i;
            }

            data.push({
                name: name,
                url: link ,
                host: "https://www.jjwxc.net"
            })
        }
        return Response.success(data);
    }
    return null;
}