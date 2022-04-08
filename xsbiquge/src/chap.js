function execute(url) {
    url = url.replace('m.xsbiquge.net', 'www.xsbiquge.net');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#content");
        htm.select("script").remove();
        htm = htm.html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}