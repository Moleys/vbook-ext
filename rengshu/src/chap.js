function execute(url) {
    url = url.replace('m.rengshu.com', 'www.rengshu.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html('gbk');
        let htm = doc.select("#content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}