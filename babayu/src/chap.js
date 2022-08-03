
function execute(url) {
    url = url.replace('m.babayu.com', 'www.babayu.com').replace('m.babayu.com', 'www.babayu.tv');
    let data  ="";
    let part1 = url.replace("https://www.babayu.tv", "").replace("http://www.babayu.tv", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        console.log(next)
        let response = fetch("https://www.babayu.tv" + next +".html");
        if (response.ok) {
            let doc = response.html();
            next = "/kanshu/" + doc.select("a:contains(下一页)").first().attr("href").replace(".html","");
            console.log(next)
            let htm = doc.select("#BookText").html();
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