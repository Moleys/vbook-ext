function execute(url) {
    url = url.replace('m.banxia.tv', 'www.banxia.tv');

    let cvData ="";
    let part1 = url.replace("http://www.banxia.tv", "").replace("https://www.banxia.tv", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch("http://www.banxia.tv" + next +".html");

        if (response.ok) {
            let doc = response.html();

            next = doc.select("a#next_url").attr("href").replace(".html","");

            let htm = doc.select("#article").html();
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