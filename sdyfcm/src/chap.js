
function execute(url) {
    url = url.replace('m.sdyfcm.com', 'www.sdyfcm.com');
    let data  ="";
    let part1 = url.replace("http://www.sdyfcm.com", "").replace("https://www.sdyfcm.com", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        console.log("http://www.sdyfcm.com" + next +".html")
        let response = fetch("http://www.sdyfcm.com" + next +".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select("a#next_url").last().attr("href").replace(".html","");            
            let htm = doc.select("#booktxt")
            htm.select("p").remove()
            htm = htm.html().replace(/\&nbsp;/g, "").replace(/\n<br>\n<br>/g, "<br>");
            data = data + htm;
        } else {
            break;
        }
    }
    if (data) {
        return Response.success(data);
    }
    return null;
}