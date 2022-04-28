function execute(url) {
    if(url.endsWith('/') === false)
        url = url + "/";
    url = url.replace('m.yodu.org', 'www.yodu.org');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("img.book-cover-blur").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.yodu.org" + coverImg;
        }
        let detail0 = "";
        doc.select(".ell._tags strong").forEach(e => {
            detail0 = detail0 + e.text() +"<br>"
        });


        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: doc.select("strong.mr15.ttl").first().text(),
            description: doc.select(".det-abt").text(),
            detail: detail0,
            host: "http://www.yodu.org"
        });
    }
    return null;
}