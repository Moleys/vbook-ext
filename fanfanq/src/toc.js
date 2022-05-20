function execute(url) {
    url = url.replace("bbs.fanfanq.com","bbs.fanfanc.com")

    let response0 = fetch(url);
    if (response0.ok) {
        let doc0 = response0.html('gbk');
        let url1 = "https://bbs.fanfanc.com/" +doc0.select("a:contains(在线阅读已开放)").first().attr("href");
        if(url1.slice(-1) !== "/")
            url1 = url1 + "/";
        let response1 = fetch(url1);
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

    }

    return null;
}