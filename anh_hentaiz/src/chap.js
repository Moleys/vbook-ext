function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let imgs  = []
        let el = doc.select(".lightbox img")
        for (var i = 0; i < el.size(); i++) {
            var image = el.get(i).attr("src").trim();
            imgs.push(image);
            
        }
        return Response.success(imgs);
    }
    return null;
}