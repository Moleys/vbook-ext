function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("ul.chapter-list li a")
        const data = [];
        for (let i = 0;i < el1.size(); i++) {
            var e = el1.get(i);
            data.push({
                name: e.select("a .chapter-title").text(),
                url:  e.attr("href"),
                host: "https://www.readwn.com"
            })
        }
        return Response.success(data);
    }
    return null;
}