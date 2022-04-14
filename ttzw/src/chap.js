function execute(url) {
    url = url.replace('m.ttzw.com', 'www.ttzw.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        doc.select(".posterror").remove();
        doc.select("script").remove();

        let htm = doc.select("#content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}