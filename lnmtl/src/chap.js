function execute(url) {
    let cnData = [];
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("div.chapter-body")
        htm.select("sentence.original")
            .forEach(e => cnData.push(e.text()));
    }
    if (cnData) {
        let htm = cnData.join("<br>");
        return Response.success(htm);
    }
    return null;
}