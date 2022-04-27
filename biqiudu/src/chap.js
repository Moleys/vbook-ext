function execute(url) {
    url = url.replace('m.biqiudu.com', 'www.biqiudu.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#content").html();
        htm = htm.replace(/\&nbsp;/g, "").replace("江浙湖汉北 ｈttpｓ://m.biqiudu.com笔趣阁","").replace("ｈttpｓ://m.biqiudu.com笔趣阁","").replace("笔趣阁网址ｍ．biqiudu。com","").replace("一秒记住ｍ．biqiudu．com","").replace("OTg2NTc=","");
        return Response.success(htm);
    }
    return null;
}