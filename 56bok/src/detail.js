function execute(url) {
    url = url.replace('m.56bok.com', 'www.56bok.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let coverImg = doc.select(".mohe-content img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.56bok.com" + coverImg;
        }
        let detail = doc.select(".mohe-content p")
        console.log(detail)
        let description = detail.select("p").last()
        detail.select("p").last().remove();
        return Response.success({
            name: doc.select(".header h1").text(),
            cover: coverImg,
            author: detail.select("p").first().text().replace(/作\s*者：/g, ""),
            description: description.text(),
            detail: detail.html().replace(/<span class/g,"</p><p><span class").replace("</p>",""),
            host: "https://www.56bok.com"
        });
    }
    return null;
}