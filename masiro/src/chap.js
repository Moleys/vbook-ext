function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("div.box-body.nvl-content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}