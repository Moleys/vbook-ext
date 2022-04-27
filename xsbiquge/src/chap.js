function execute(url) {
    url = url.replace('m.xsbiquge.net', 'www.xsbiquge.net');
    let data  ="";
    let part1 = url.replace("https://www.xsbiquge.net", "").replace("http://www.xsbiquge.net", "").replace("http://www.xsbiquge.net", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        console.log("https://www.xsbiquge.net" + next +".html")
        let response = fetch("https://www.xsbiquge.net" + next +".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select(".bottem2 a").last().attr("href").replace(".html","");
console.log(next)
            let htm = doc.select("#booktxt").html();
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