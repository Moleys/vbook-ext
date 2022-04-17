function execute(url) {
    url = url.replace('m.txt520.com', 'www.txt520.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        return Response.success({
            name: doc.select(".nav_name h1").text(),
            author: doc.select(".nav_autor").first().text().replace(/作\s*者：/g, ""),
            description: doc.select(".main_content .desc").html(),
            detail: doc.select(".nav_autor").first().text() + "<br>" + doc.select(".nav_time").text(),
            host: "http://www.txt520.com"
        });
    }
    return null;
}