function execute(url) {
    url = url.replace('m.aduosw.com', 'www.aduosw.com').replace('amp.aduosw.com', 'www.aduosw.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#chaptercontent").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}