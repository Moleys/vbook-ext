function execute(url, page) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
        let ele1 = doc.select('table[width="984"] tbody').get(2);
        ele1.select("tr").first().remove();
		ele1.select("tr").forEach(e => {
            let name = e.select("td").get(2).select("a").text();
            let link = e.select("td").get(2).select("a").attr("href");
            data.push({
                name: name,
                link: "http://www.jjwxc.net/" + link,
                description: e.select("td").get(1).text(),
                host: "http://www.jjwxc.net/"
            })
        });
        return Response.success(data)
    }
    return null;
}