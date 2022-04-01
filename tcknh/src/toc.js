function execute(url) {
	url = url.replace('m.tcknh.com', 'www.tcknh.com');
    let url2 = url.split(/[/ ]+/).pop().replace(".html","")
    url = "http://www.tcknh.com/chapter/" + url2 +"/"

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#listsss").last()
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: url  + e.attr("href"),
                host: "http://www.tcknh.com"
            })
        }
        return Response.success(data);
    }
    return null;
}