load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);


    let cvData = "";
    let part1 = url.replace(BASE_URL, "").replace(".html", "");
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch(BASE_URL + next + ".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select("p.to_nextpage a").last().attr("href").replace(".html", "");
            doc.select("p.to_nextpage").remove();
            doc.select("p.copyright").remove();
            let htm = doc.select("#BookText").html().replace(/\n/g, "").replace(/<br><br> /g, "<br>").replace(/\&nbsp;/g, "");
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