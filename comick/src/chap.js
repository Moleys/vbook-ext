function execute(url) {
    let url_api =  "https://api.comick.app/chapter/" + url.split(/[/ ]+/).pop()
    // https://api.comick.app/chapter/IktjUcGf/
    let response = fetch(url_api);
    if (response.ok) {
        let doc = response.json();
        let el = doc.chapter.md_images
        var data = [];
        for (var i = 0; i < el.length; i++) {
            var img = el[i].b2key
            img = "https://meo.comick.pictures/" + img
            data.push(img);
        }
        return Response.success(data);
    }
    return null;
}