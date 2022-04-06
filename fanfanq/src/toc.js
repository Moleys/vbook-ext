function execute(url) {

    let response0 = fetch(url);
    if (response0.ok) {
        let doc0 = response0.html('gbk');
        let url1 = "https://bbs.fanfanq.com/" +doc0.select('#read_Att_tpc a[style*="color:green;"]').last().attr("href");
        let response1 = fetch(url1);
        if (response1.ok) {
            let doc = response1.html('gbk');
            let el1 = doc.select("ul.cf")
            let el = el1.select("li a")
            const data = [];
            for (let i = 0;i < el.size(); i++) {
                var e = el.get(i);
                data.push({
                    name: e.select("a").text(),
                    url:"https://bbs.fanfanq.com/" + e.attr("href"),
                    host: "https://bbs.fanfanq.com"
                })
            }
            return Response.success(data);
        }

    }

    return null;
}