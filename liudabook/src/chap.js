function execute(url) {
    if(url.indexOf("https://") === -1)
        url = "https://" +url;
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let htm = doc.select(".read-content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}