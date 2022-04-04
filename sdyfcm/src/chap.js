function execute(url) {
    url = url.replace('m.sdyfcm.com', 'www.sdyfcm.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#booktxt").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}