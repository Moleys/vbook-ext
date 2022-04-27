function execute(url) {
    url = url.replace('m.shumilou.co', 'www.shumilou.co');
    let data  ="";
    let part1 = url.replace("https://www.shumilou.co", "").replace("http://www.shumilou.co", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        console.log(next)
        let response = fetch("https://www.shumilou.co" + next +".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select("a[rel=\"next\"]").attr("href").replace(".html","");
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