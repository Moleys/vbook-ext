function execute(url) {
    url = url.replace('m.38kanshu.com', 'www.38kanshu.com');
    let cvData ="";
    let part1 = url.replace("http://www.38kanshu.com", "").replace("https://www.38kanshu.com", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch("http://www.38kanshu.com" + next +".html");
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