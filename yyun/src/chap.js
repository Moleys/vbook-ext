function execute(url) {
    url = url.replace('m.yyun.net', 'www.yyun.net');

    let cvData ="";
    let part1 = url.replace("http://www.yyun.net", "").replace("https://www.yyun.net", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch("http://www.yyun.net" + next +".html");

        if (response.ok) {
            let doc = response.html();
            doc.select(".k").remove();
            doc.select(".kk").remove();
            doc.select("center").remove();

            next = doc.select(".bottem2 a").get(2).attr("href").replace(".html","");

            let htm = doc.select("#content").html();
            htm = htm.replace(/\&nbsp;/g, "").replace("我们就是过眼云烟的烟云小说网【m.yyun.net】","").replace("支持.\\^完*本*神*站*\\^.把本站分享那些需要的小伙伴！找不到书请留言！支持↘1♂6♂8♂看♂书↙把本站分享那些需要的小伙伴！找不到书请留言！","").replace("一秒记住【烟云小说】输入地址：m.yyun.net","").replace("↘1♂6♂8♂看♂书↙手机用户输入：♂m♂.1♂6♂8♂kan♂shu.♂co3","").replace("一秒记住.↘完^本.神^站.首^发↘.输入地址：om","").replace("【长夜读小说网：长夜何其漫，唯有读书欢！】","").replace("【长夜读小说网：长夜何其漫，唯有读书欢！】","").replace("-&gt;&gt;本章未完，点击下一页继续","").replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(<br>)+/g, '<br>');
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