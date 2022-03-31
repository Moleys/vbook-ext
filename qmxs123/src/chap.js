function execute(url) {
    url = url.replace('m.qmxs123.com', 'www.qmxs123.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#chaptercontent").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}