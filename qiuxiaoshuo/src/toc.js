function execute(url) {
    url = url.replace('m.qiuxiaoshuo.org/book-', 'www.qiuxiaoshuo.org/book/');
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    if(url.endsWith('.html') === false)
        url = url + ".html";
    let response = fetch(url.replace("/book/","/read/"));
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#chapters-list").last()
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.qiuxiaoshuo.org" + e.attr("href"),
                host: "http://www.qiuxiaoshuo.org"
            })
        }
        return Response.success(data);
    }
    return null;
}