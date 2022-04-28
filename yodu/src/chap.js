function execute(url) {
    url = url.replace('m.yodu.org', 'www.yodu.org');

    let data  ="";
    let part1 = url.replace("https://www.yodu.org", "").replace("http://www.yodu.org", "").replace(".html","");
    var next = part1;
        console.log(next)
    while (next.includes(part1)) {
        console.log("https://www.yodu.org" + next +".html")
        let response = fetch("https://www.yodu.org" + next +".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select("script").html().split("var nextpage=\"")[1].split("\"")[0].replace("https://www.yodu.org", "").replace("http://www.yodu.org", "").replace(".html","");
console.log(next)
            let htm = doc.select("#TextContent");
            htm.select("dt").remove();
            htm.select("script").remove();
            htm.select("div").remove();
            htm.select('p[style*="font-weight: 400;"]').remove();
            htm = htm.html().replace(/\&nbsp;/g, "");
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