function execute(url) {
    url = url.replace('m.80k.net', 'www.80k.net');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".content").text();
        htm = htm.split(" 　　").join("<br>");
        return Response.success(htm);
    }
    return null;
}