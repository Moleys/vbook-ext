function execute(url) {
    url = url.replace('m.uuks.org', 'www.uuks.org');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".jieshao-img img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.uuks.org" + coverImg;
        }
        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: doc.select("h2").first().text().replace(/作\s*者：/g, ""),
            description: doc.select("h3").text(),
            detail: doc.select("div.shijian").text(),
            host: "https://www.uuks.org"
        });
    }
    return null;
}