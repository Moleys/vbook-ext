function execute(url) {
    let response = fetch(url+"/");
    if (response.ok) {
        let doc = response.html('gbk');
        let el = doc.select("#list-chapterAll a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"https://www.po18gv.vip" + e.attr("href"),
                host: "https://www.po18gv.vip"
            })
        }
        return Response.success(data);
    }
    return null;
}