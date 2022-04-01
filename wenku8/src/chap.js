function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html('gbk');
        doc.select("#contentdp").remove();

        let htm = doc.select("#content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}