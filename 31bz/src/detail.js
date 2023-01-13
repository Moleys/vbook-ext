load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);


    // function execute(url) {
    //     url = url.replace('m.31bz.org', 'www.31bz.org').replace('s.31bz.org', 'www.31bz.org');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".book-img img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = BASE_URL + coverImg;
        }
        let author = doc.select(".book-stats b a").first().text().replace(/作\s*者：/g, "");

        let description = doc.select(".book-intro");
        description.select("span").remove();
        description.select("a").remove();

        return Response.success({
            name: doc.select(".book-title h1").text().replace("《", "").replace("》", ""),
            cover: coverImg,
            author: author,
            description: description.text(),
            detail: "作者： " + author + "<br>" + doc.select("p.book-stats b").get(3).text(),
            host: BASE_URL,
        });
    }
    return null;
}