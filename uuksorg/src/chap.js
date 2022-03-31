function execute(url) {
    url = url.replace('m.uuks.org', 'www.uuks.org');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#contentbox").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}