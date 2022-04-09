function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".reading-content .page-break");
        var imgs = [];
        for (var i = 0; i < htm.size(); i++) {
            var image = htm.get(i).select("img").attr("src").trim();
            imgs.push(image);
            
        }
        return Response.success(imgs);
    }
    return null;
}


