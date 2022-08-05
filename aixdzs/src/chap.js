function execute(url) {
    url = url.replace('www.aixdzs.com', 'm.aixdzs.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("article.page-content section").html();
        return Response.success(htm);
    }
    return null;
}