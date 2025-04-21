function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        let el = doc.select("#chapterList a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "https://www.esjzone.cc"
            })
        }
        return Response.success(data);
    }
    return null;
}