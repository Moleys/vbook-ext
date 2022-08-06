function execute(url) {
    url = url.replace('m.dghsym.com', 'www.dghsym.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".novel_info_main img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.dghsym.com" + coverImg;
        }
        let author =  doc.select(".novel_info_title i a").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select(".novel_info_title h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".intro p").html(),
            detail: "作者： " + author + "<br>" + doc.select(".novel_info_title p").first().text(),
            host: "http://www.dghsym.com"
        });
    }
    return null;
}