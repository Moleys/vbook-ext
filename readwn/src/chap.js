function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".chapter-content");
        htm.select("script").remove()
        return Response.success(htm.html());
    }
    return null;
}