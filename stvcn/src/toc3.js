function execute(url) {
    url = "https://book.sfacg.com/Novel/541520/"
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
                url: ("https://book.sfacg.com" + e.attr("href")).replace("https://book.sfacg.com/vip/c/","https://sangtacviet.pro/truyen/sfacg/1/541520/").replace("https://book.sfacg.com/Novel/541520/720553/","https://sangtacviet.pro/truyen/sfacg/1/541520/"),
                host: "https://book.sfacg.com"
            })
        }
        return Response.success(data);
    }
    return null;
}