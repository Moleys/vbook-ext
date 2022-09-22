function execute(url) {
    url = url.replace('m.mijiashe.com', 'www.mijiashe.com');
    let cvData ="";
    let part1 = url.replace("http://www.mijiashe.com", "").replace("https://www.mijiashe.com", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch("http://www.mijiashe.com" + next +".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select("a#next_url").attr("href").replace(".html","");
            doc.select("span").remove();
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