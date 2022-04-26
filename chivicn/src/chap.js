function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    url = url.replace("chivi.xyz", "chivi.app");
    let cvData = [];
    let part1 = url.replace("https://chivi.app", "");
    var next = part1;
    while (next.replace(next.split(/[/ ]+/).pop().split("-")[0],"").replace(/-/g,"").includes(part1.replace(part1.split(/[/ ]+/).pop().split("-")[0],"").replace(/-/g,""))) {
        let response = fetch("https://chivi.app" + next);
        if (response.ok) {
            let doc = response.html();
            next = doc.select("a.m-btn._fill.navi-item._primary").last().attr("href");
            let json1 = JSON.parse(doc.select('script[type="application/json"]').last().html());
            let json2 = JSON.parse(json1.body.split("\\").join("")).props.zhtext;
            let theRemovedElement = json2.shift();
            Array.prototype.push.apply(cvData, json2);
        } else {
            return null;
        }
    }
    if (cvData) {
        let htm = cvData.join("<br>");
        return Response.success(htm);
    }
    return null;
}