function execute(url) {
    url = url.replace('wap.mengyuanshuchengcn.com', 'www.mengyuanshuchengcn.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".art_cnt p").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}