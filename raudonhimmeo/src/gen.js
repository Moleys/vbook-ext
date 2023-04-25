function execute(url, page) {
    if (!page) page = '1';
    let url1 = "https://raudo.nhimmeo.cf/site/" + url + "?index=0&page=" + page;
    let response = fetch(url1)
    if (response.ok) {
        let doc = response.html();
        let el = doc.select('#search_result > div > div');
        let sizel = el.size()
        const data = [];
        for (let j = 0; j < sizel; j++) {
            var e = el.get(j);
            data.push({
                name: e.select('a').first().attr("title"),
                link: "https://raudo.nhimmeo.cf" + e.select('a').first().attr("href"),
                cover: e.select("img").attr("data-src"),
                host: "https://raudo.nhimmeo.cf"
            });
        }
        var next = doc.select("#paginationSection a.active + a").text();
        return Response.success(data, next)
    }
    return null;
}