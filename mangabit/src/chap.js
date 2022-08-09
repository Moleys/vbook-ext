function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("#mgb-page-box img");
        var data = [];
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            var img = e.attr("data-src");
            data.push(img);
        }
        return Response.success(data);
    }
    return null;
}