function execute(url) {
    url = url.replace('m.31bz.org', 's.31bz.org').replace('www.31bz.org', 's.31bz.org');

    let cvData="";
    let part1 = url.replace("https://s.31bz.org", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch("https://s.31bz.org" + next +".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select("p.to_nextpage a").last().attr("href").replace(".html","");
            doc.select("p.to_nextpage").remove();
            doc.select("p.copyright").remove();
            let htm = doc.select("#BookText").html().replace(/\n/g, "").replace(/<br><br> /g,"<br>").replace(/\&nbsp;/g, "");
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