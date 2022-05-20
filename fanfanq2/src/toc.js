function execute(url) {
    url = url.replace("bbs.fanfanq.com","bbs.fanfanc.com")
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response1 = fetch(url);
    if (response1.ok) {
        let doc = response1.html('gbk');
        let el = doc.select("ul.cf li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"https://bbs.fanfanc.com/" + e.attr("href"),
                host: "https://bbs.fanfanc.com"
            })
        }
        return Response.success(data);
    }
    return null;
}