function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("article.article-content").html().split('<div class=\"pagination2\">')[0]+"<\/p>";
        htm = Html.clean(htm, ["p"]).replace(/<p><\/p>/g,"")
        return Response.success(htm);
    }
    return null;
}