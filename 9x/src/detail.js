load('config.js');

function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".cover img").first().attr("src");
        let author = doc.select(".upload").text().split(" 著")[0]
        let name = doc.select(".info h3").text()
        let description = doc.select(".desc")
        let ongoing = doc.select(".tag span").last().text()
        return Response.success({
            name: name,
            cover: coverImg,
            author: author,
            description: description.html(),
            detail: "作者： " + author + "<br>" + ongoing,
            ongoing: (ongoing == '连载'),
            host: BASE_URL
        });
    }
    return null;
}