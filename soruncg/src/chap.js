function execute(url) {
    url = url.replace('m.soruncg.com', 'www.soruncg.com');
    let cvData ="";
    let part1 = url.replace("http://www.soruncg.com", "").replace("http://www.soruncg.com", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch("http://www.soruncg.com" + next +".html");
        if (response.ok) {
            let doc = response.html();
            doc.select(".posterror").remove()
            next = doc.select("a:contains(下一页)").first().attr("href").replace(".html","");
            let htm = doc.select("#content").html();
            htm = htm.replace(/\&nbsp;/g, "");
            cvData = cvData + htm;
        } else {
            break;
        }
    }
    if (cvData) {
        return Response.success(cvData);
    }
    return null;
}