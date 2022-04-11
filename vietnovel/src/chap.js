function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.json();
        let htm = doc.htmlContent;
        return Response.success(htm);
    }
    return null;
}