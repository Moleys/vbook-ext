function execute(url) {

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let htm = doc.select(".noveltext").html()
        let fontname = htm.split("<div class=\"noveltext")[1].split("\">")[0].trim();
        return fontname;
    }


    return null;
}