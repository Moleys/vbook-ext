function execute(url) {
    // url = url.replace('m.cool18.com', 'www.cool18.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        doc.select("font ").remove();
        let htm = doc.select("pre").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}