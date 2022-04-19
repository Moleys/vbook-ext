function execute(url) {
    url = url.replace('m.51kanshu.cc', 'www.51kanshu.cc');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}