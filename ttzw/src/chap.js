function execute(url) {
    url = url.replace('m.ttzw.com', 'www.ttzw.com');

    let cvData ="";
    let part1 = url.replace("http://www.ttzw.com", "").replace("https://www.ttzw.com", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch("http://www.ttzw.com" + next +".html");

        if (response.ok) {
            let doc = response.html();

            next = doc.select(".section-opt").last().select("a").get(2).attr("href").replace(".html","");
            console.log(next)
            doc.select(".posterror").remove();
            doc.select("script").remove();
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