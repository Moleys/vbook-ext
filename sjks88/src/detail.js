function execute(url) {
    url = url.replace('m.sjks88.com', 'www.sjks88.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let author = doc.select(".autor2").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select(".box-artic h1").text(),
            author: author,
            description: doc.select(".main_content .desc").html(),
            detail: "作者：" + author + "<br>" + doc.select(".autor2").get(1).text()+ "<br>" + doc.select(".autor2").get(2).text(),
            host: "http://www.sjks88.com"
        });
    }
    return null;
}