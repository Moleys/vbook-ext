function execute(url) {
    url = url.replace('m.tcknh.com', 'www.tcknh.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#txt").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}