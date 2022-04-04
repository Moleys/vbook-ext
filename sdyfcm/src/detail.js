function execute(url) {
    url = url.replace('m.sdyfcm', 'www.sdyfcm.com');
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("img.img-thumbnail").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.sdyfcm.com" + coverImg;
        }
        return Response.success({
            name: doc.select("h1.bookTitle").text(),
            cover: coverImg,
            author: doc.select("a.red").first().text().replace(/作\s*者：/g, ""),
            description: doc.select("#bookIntro").text(),
            detail: doc.select(".booktag").last().html(),
            host: "http://www.sdyfcm.com"
        });



    }
    return null;
}