function execute(url) {
    url = url.replace('m.powanjuan.cc', 'www.powanjuan.cc')
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html('gbk');
        let htm = doc.select("#mycontent").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}