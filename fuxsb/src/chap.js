function execute(url) {
    url = url.replace('m.fuxsb.com', 'www.fuxsb.com').replace('m.fuxsb.cc', 'www.fuxsb.com').replace('www.fuxsb.com', 'www.fuxsb.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".wz-nr").html();
        htm = htm.replace(/Fxsw.org/g, "");
        return Response.success(htm);
    }
    return null;
}