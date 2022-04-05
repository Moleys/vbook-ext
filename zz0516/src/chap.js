

function execute(url) {
    url = url.replace('m.zz0516.com', 'www.zz0516.com');

    let cvData;
    let part1 = url.replace("http://www.zz0516.com", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch("http://www.zz0516.com" + next +".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select(".pereview a").last().attr("href").replace(".html","");
            doc.select("p.to_nextpage").remove();
            let htm = doc.select("#content").html();
            htm = htm.replace(/\&nbsp;/g, "");
            htm = htm.replace("<br><b>Warning<\/b>: Undefined array key \"HTTP_USER_AGENT\" in <b>/www/wwwroot/piaoyuxuan.com/read.php<\/b> on line <b>283<\/b>\n","").replace("<br>她--&gt;&gt;\n","").replace("&lt;--&gt;&gt;","");
            

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