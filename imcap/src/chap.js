function execute(url) {
    url = url.replace('m.imcap.cn', 'www.imcap.cn');


    let cvData;
    let part1 = url.replace("http://www.imcap.cn", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch("http://www.imcap.cn" + next +".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select(".read_nav a").last().attr("href").replace(".html","");

            let htm = doc.select("#content").html();
            cvData = cvData + htm;
        } else {
            return null;
        }
    }
    if (cvData) {
        return Response.success(cvData);
    }
    return null;
}