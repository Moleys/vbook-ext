function execute(url) {
    url = url.replace('www.665txt.com', 'm.665txt.com');
    let data  ="";
    let part1 = url.replace("https://www.665txt.com", "").replace("http://www.665txt.com", "").replace(".html","").replace("http://m.665txt.com","");;

    var next = part1;

    while (next.includes(part1)) {
        console.log(next)
        console.log("http://m.665txt.com" + next +".html")
        let response = fetch("http://m.665txt.com" + next +".html");

        if (response.ok) {
            let doc = response.html('gbk');
            next = doc.select("a#pb_next").last().attr("href").replace(".html","").replace("http://m.665txt.com","");
console.log(next)
            let htm = doc.select("#nr1").html();
            htm = htm.replace(/\&nbsp;/g, "").split("--&gt;&gt;")[0];
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