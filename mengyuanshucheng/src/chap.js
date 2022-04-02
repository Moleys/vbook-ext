function execute(url) {
    url = url.replace('wap.mengyuanshucheng.com', 'www.mengyuanshucheng.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".pt-read-text").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}