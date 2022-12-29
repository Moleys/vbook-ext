function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.json();
        let htm = doc.data.content.replace(/\r\n/g,"<br>");
        return Response.success(htm);
    }
    return null;
}