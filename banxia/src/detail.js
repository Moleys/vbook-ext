function execute(url) {
    url = url.replace('m.banxia.tv', 'www.banxia.tv');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".novel_info_main img").first().attr("src");
        if (coverImg.startsWith("//")) {
            coverImg = "https:" + coverImg;
        }
        let author = doc.select(".novel_info_title i a").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select(".novel_info_title h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".intro").html(),
            detail: "作者： " +  author + "<br>" + doc.select(".flex.to100").text(),
            host: "https://www.banxia.tv"
        });
    }
    return null;
}