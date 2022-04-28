function execute(url) {
    url = url.replace('m.sfacg.com/b/', 'book.sfacg.com/Novel/');
    if(url.endsWith('/'))
        url = url.slice(0, -1)
    let response = fetch(url+"/MainIndex/");
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".catalog-list ul li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text().replace("","").trim(),
                url: "https://book.sfacg.com" + e.attr("href"),
                host: "https://book.sfacg.com"
            })
        }
        return Response.success(data);
    }
    return null;
}