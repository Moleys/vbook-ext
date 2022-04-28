function execute(url) {
    url = url.replace('m.76kanshu.com', 'www.76kanshu.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#content").html();
        htm = htm.replace(/\&nbsp;/g, "").replace("【76看书网】天才一秒记住本站地址：m.76kanshu.最快更新！无广告！","").replace(/.76kanshu./g, "");
        return Response.success(htm);
    }
    return null;
}