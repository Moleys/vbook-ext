function execute(url) {
    url = url.replace('m.shumilouxs.com', 'www.shumilouxs.com');
    let bookId = url.match(/\d+/g)
    let response = fetch("http://www.shumilouxs.com/indexlist/" + bookId + "/");
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#indexselect").last()
        let el = el1.select("option")
        const data = [];
        for (let i = 0; i < el.size(); i++) {
            var e = el.get(i);
            data.push(e.attr("value"))
        }
        return Response.success(data);
    }
    return null;
}