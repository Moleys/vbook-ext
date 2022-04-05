function execute(url) {
    url = url.replace('m.imcap.cn', 'www.imcap.cn');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".novel_info_main img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.imcap.cn" + coverImg;
        }
        let description = doc.select(".intro").first();
        description.select("h2").remove();
        
        return Response.success({
            name: doc.select(".novel_info_title h1").text(),
            cover: coverImg,
            author: doc.select(".novel_info_title i").first().text().replace(/作\s*者：/g, ""),
            description: description.text(),
            detail: doc.select(".flex.to100").last().text(),
            host: "http://www.imcap.cn"
        });
    }
    return null;
}