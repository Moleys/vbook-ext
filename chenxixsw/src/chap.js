
function execute(url) {
    url = url.replace('m.chenxixsw.com', 'www.chenxixsw.com');
    let response = fetch(url);

    if (response.ok) {
        var doc = response.html('gbk');
        let htm = doc.select("#content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}