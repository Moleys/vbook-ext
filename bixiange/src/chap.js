function execute(url) {
    url = url.replace('m.bixiange.top', 'www.bixiange.top').replace('m.bixiange.me', 'www.bixiange.top').replace('www.bixiange.me', 'www.bixiange.top');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html('gbk');
        let htm = doc.select("#mycontent").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}