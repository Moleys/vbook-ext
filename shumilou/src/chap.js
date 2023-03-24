function execute(url) {
    url = url.replace('m.shumilouxs.com', 'www.shumilouxs.com');
    let data = "";
    let part1 = url.replace("http://www.shumilouxs.com", "").replace(".html", "");
    var next = part1;
    while (next.includes(part1)) {
        console.log(next)
        let response = fetch("http://www.shumilouxs.com" + next + ".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select("a[rel=\"next\"]").attr("href").replace(".html", "");
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