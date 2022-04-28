function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    if(url.includes("m.76kanshu.com"))
    {
        url = "http://www.76kanshu.com/book/" + url.split(/[/ ]+/).pop();
    }
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("#yuedu").last().select("ul li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.76kanshu.com" + e.attr("href"),
                host: "http://www.76kanshu.com"
            })
        }
        return Response.success(data);
    }
    return null;
}