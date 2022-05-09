function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("item")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            var link = e.html().split("<link><![CDATA[")[1].split("]]>")[0];
            data.push({
                name: e.select("title").text().replace("<![CDATA[","").replace("]]>",""),
                url: link,
                host: "https://tuoitre.vn"
            })
        }
        data.reverse();
        return Response.success(data);
    }
    return null;
}