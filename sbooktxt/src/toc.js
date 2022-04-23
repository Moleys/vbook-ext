function execute(url) {
    if(url.includes("m.sbooktxt.com")){
        let bookid = url.split(/[/ ]+/).pop().replace(".html","");
        url ="https://www.sbooktxt.com/0_"+bookid + "/"
    }
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#list").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.sbooktxt.com" + e.attr("href"),
                host: "http://www.sbooktxt.com"
            })
        }
        return Response.success(data);
    }
    return null;
}