function execute(url) {
    let responseToc = fetch(url);
    if (responseToc.ok) {
        const data = [];
        let doctoc = responseToc.html();
        let el = doctoc.select("ol.BCsectionTwo-top li");
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a.g").text(),
                url:"https://www.sosadfun.org" + e.select("a.g").attr("href"),
                host: "https://www.sosadfun.org"
            })
        }
        
        return Response.success(data);
    }
    return null;
}