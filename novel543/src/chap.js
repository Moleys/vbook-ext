function execute(url) {
    url = url.replace('m.novel543.com', 'www.novel543.com');
    let cvData ="";
    let part1 = url.replace("http://www.novel543.com", "").replace("https://www.novel543.com", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch("https://www.novel543.com" + next +".html");
        if (response.ok) {
            let doc = response.html();
            doc.select("script").remove();
            doc.select(".adsbygoogle").remove();
            doc.select(".gadBlock").remove();
            doc.select(".adUnit").remove();
            let htm = doc.select(".content").html();
            htm = htm.replace(/\&nbsp;/g, "");
            next = doc.select("a:contains(下一章)").first().attr("href").replace(".html","");
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