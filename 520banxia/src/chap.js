function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".txtnav");
        htm.select("h1").remove();
        htm.select("div").remove();
        htm.select("script").remove();
        htm = htm.html().replace(/\&nbsp;/g, "").replace(/\&emsp;/g, "");
        return Response.success(htm);
    }
    return null;
}