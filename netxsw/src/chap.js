function execute(url) {
    url = url.replace('m.netxsw.com', 'www.paoshu8.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".chapter-content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}