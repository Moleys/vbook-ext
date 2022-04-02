function execute(url) {
    url = url.replace('m.jingwubook.com', 'www.jingwubook.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#content_main").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}