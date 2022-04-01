function execute(url) {
    url = url.replace('www.biqugse.com', 'm.biqugse.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".block_img2 img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://m.biqugse.com" + coverImg;
        }

        return Response.success({
            name: doc.select(".block_txt2 h2").text(),
            cover: coverImg,
            author: doc.select(".block_txt2 p").get(2).text().replace(/作\s*者：/g, ""),
            description: doc.select(".intro_info").text(),
            detail: doc.select(".block_txt2 p").last().html(),
            host: "http://www.biqugse.com"
        });
    }
    return null;
}