
function execute(url) {
    url = url.replace('m.lanlanguoji.com', 'www.lanlanguoji.com');
    let data  ="";
    let part1 = url.replace("http://www.lanlanguoji.com", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        console.log(next)
        let response = fetch("http://www.lanlanguoji.com" + next +".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select("a#next_url").last().attr("href").replace(".html","");
console.log(next)
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