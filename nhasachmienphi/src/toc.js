function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".box_chhr").last();
        let el2 = el1.text();
        if(el2.length === 0){
            return null;
        }
        let el = el1.select(".item_ch a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "http://nhasachmienphi.com"
            })
        }
        return Response.success(data);
    }
    return null;
}