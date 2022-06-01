function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("section.previews div.preview img");
        var data = [];
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            var img = e.attr("src").replace("/320.webp",".jpg");
            data.push(img);
        }
        return Response.success(data);
    }


    return null;
}