function execute(url) {
    url = url.replace('m.tcknh.com', 'www.tcknh.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".nbg img").first().attr("src");
        if (coverImg.startsWith("//")) {
            coverImg = "http:" + coverImg;
        }


        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: doc.select("#info span").first().text().replace(/作\s*者：/g, "").replace("作者:",""),
            description: doc.select(".intro p").text(),
            detail: doc.select("#info a").get(2).html(),
            host: "http://www.tcknh.com"
        });
    }
    return null;
}