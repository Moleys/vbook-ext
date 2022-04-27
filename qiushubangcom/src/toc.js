function execute(url) {
	url = url.replace('m.qiushubang.com', 'www.qiushubang.com');
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let el1 = doc.select(".chapterCon").last()
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.qiushubang.com" + e.attr("href"),
                host: "http://www.qiushubang.com"
            })
        }
        data = data.reverse();
        return Response.success(data);
    }
    return null;
}