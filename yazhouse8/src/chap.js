function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".content")
        htm.select("a").remove()
        htm.select("section").remove()
        htm.select("script").remove()
        htm.select(".bottom").remove()
        htm.select("ul").remove()
        htm = htm.html().replace(/\&nbsp;/g, "").replace(/<div>/g, "").split("==记住==")[0];
        return Response.success(htm);
    }
    return null;
}