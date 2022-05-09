function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("div.main-content-body");
        // htm.select("h2").remove();
        htm.select(".relate-container").remove();
        htm.select('div[type="RelatedOneNews"]').remove();
        htm.select("a").remove();
        htm = htm.html().replace("<i class=\"icon-pencil\"><\/i>","").replace(/\n/g,'').replace("<h2","<b").replace("<\/h2>","<\/b>");
        return Response.success(htm);
    }
    return null;
}