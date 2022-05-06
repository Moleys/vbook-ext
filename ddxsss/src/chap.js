function execute(url) {
    url = url.replace('m.ddxsss.com', 'www.ddxsss.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#chaptercontent").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}