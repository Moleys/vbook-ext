function execute(url) {
    url = url.replace('wap.mengyuanshucheng.com', 'www.mengyuanshucheng.com');
    url = url.replace("/index/","/my/")
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("#bookimg img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.mengyuanshucheng.com" + coverImg;
        }
        return Response.success({
            name: doc.select(".bookright h1").text(),
            cover: coverImg,
            author: doc.select(".bookright #author").first().text().replace(/作\s*者：/g, ""),
            description: doc.select("#bookintro p").text(),
            detail: doc.select(".new_t span").last().html(),
            host: "http://www.mengyuanshucheng.com"
        });
    }
    return null;
}