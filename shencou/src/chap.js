function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let htm = doc.select("#novelcontent").html();
        return Response.success(htm);
    }
    return null;
}