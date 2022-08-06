function execute(key) {
    let response1 = fetch("https://www.dghsym.com/search/", {
        method: "POST",
        body: {
                "searchkey": key,
                "searchtype": "all",
                "Submit": ""
            }
        });

    if (response1.ok) {
        console.log("doc1")
        let doc1 = response1.html();
        let el = doc1.select("ul.flex li.searchresult")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("h3").text(),
                cover: e.select("img").first().attr("data-original"),
                url: e.select("a").first().attr("href"),
                // description: e.select(" p").first().text(),
                host: "https://www.dghsym.com"
            })
        }
        return Response.success(data);
    }
    
    return null;
}
