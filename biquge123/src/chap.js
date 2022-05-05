
function execute(url) {
    url = url.replace('m.biquge123.cc', 'www.biquge123.cc');
    let data  ="";
    let part1 = url.replace("https://www.biquge123.cc", "").replace("https://www.biquge123.cc", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        console.log(next)
        let response = fetch("https://www.biquge123.cc" + next +".html");
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