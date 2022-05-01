
function execute(url) {
    url = url.replace('www.rsilu.com', 'book.rsilu.com');
    let data  ="";
    let part1 = url.replace("https://book.rsilu.com", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        console.log("https://book.rsilu.com" + next +".html")
        let response = fetch("https://book.rsilu.com" + next +".html");
        if (response.ok) {
            let doc = response.html('gbk');
            next = doc.select("a#pb_next").last().attr("href").replace(".html","").trim();
console.log(next)
            let htm = doc.select("#nr1")
            htm.select("p[style*=color:#CD8500;]").remove();
            htm.select("p[style*=color:red;]").remove();
            htm.select("p[style*=color:#FF0000; text-align:center;]").remove();
            htm = htm.html().replace(/\&nbsp;/g, "").replace("老域名(.com)被墙，请您牢记本站最新域名(.org)","").replace("您可以在百度里搜索\u201c枭臣天下(.org)\u201d查找最新章节！","")
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