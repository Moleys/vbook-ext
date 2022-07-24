function execute(url) {
    url = url.replace('m.powanjuan.cc', 'www.powanjuan.cc')
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let el1 = doc.select(".clearfix").last()
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.powanjuan.cc" + e.attr("href"),
                host: "http://www.powanjuan.cc"
            })
        }
        return Response.success(data);
    }
    return null;
}