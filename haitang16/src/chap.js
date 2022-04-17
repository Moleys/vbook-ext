function execute(url) {
    url = url.replace('m.haitang16.com', 'www.haitang16.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#TextContent");
        htm.select("dt").remove();
        htm.select("script").remove();

        htm = htm.html().replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}