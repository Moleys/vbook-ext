function execute(url) {
    url = url.replace('m.txt520.com', 'www.txt520.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}