function execute(url) {
    if(url.endsWith('/') === false)
        url = url + "/";
	url = url.replace('m.yodu.org', 'www.yodu.org');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#chapterList").last()
        let el = el1.select("li.w33p a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "http://www.yodu.org"
            })
        }
        return Response.success(data);
    }
    return null;
}