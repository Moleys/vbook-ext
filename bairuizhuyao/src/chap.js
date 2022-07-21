
function execute(url) {
    url = url.replace('m.bairuizhuyao.com', 'www.bairuizhuyao.com');
    let data  ="";
    let part1 = url.replace("http://www.bairuizhuyao.com", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        console.log(next)
        let response = fetch("http://www.bairuizhuyao.com" + next +".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select("a:contains(下一页)").first().attr("href").replace(".html","");
            doc.select(".posterror").remove();
            doc.select("script").remove();
            let htm = doc.select("#content").html();
            data = data + htm;
        } else {
            break;
        }
    }
    if (data) {
        return Response.success(data);
    }
    return null;
}