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
        let author = doc.select(".bookright #author").first().text().replace(/作\s*者：/g, "")
        return Response.success({
            name: doc.select(".bookright h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select("#bookintro p").text(),
            detail:  "作者：" + author + "<br>" +doc.select(".new_t span").last().html(),
            host: "http://www.mengyuanshucheng.com"
        });
    }
    return null;
}