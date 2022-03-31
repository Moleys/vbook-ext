function execute(url) {
	url = url.replace('m.vipkanshu.vip', 'www.vipkanshu.vip');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        let el1 = doc.select(".listmain").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 5;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: 'https://www.vipkanshu.vip'+ e.attr("href"),
                host: "https://www.vipkanshu.vip"
            })
        }
        return Response.success(data);
    }
    return null;
}