function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        console.log(doc)
        let htm = doc.select(".article-text").html()
        htm = Html.clean(htm, ["p"])
        return Response.success(htm);
    }
    return null;
}