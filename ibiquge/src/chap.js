function execute(url) {
    url = url.replace('m.ibiquge.net', 'www.ibiquge.net');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#content").html();
        htm = htm.replace(/\&nbsp;/g, "").replace("<p> 天才一秒记住本站地址：[笔趣阁] https://www.ibiquge.net/最快更新！无广告！<br><br> <\/p>","");
        return Response.success(htm);
    }
    return null;
}