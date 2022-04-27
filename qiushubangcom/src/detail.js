function execute(url) {
    url = url.replace('m.qiushubang.com', 'www.qiushubang.com');
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html('gbk');
        let coverImg = doc.select(".bookImg img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.qiushubang.com" + coverImg;
        }
        let author =  doc.select(".bookPhr dd").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select(".bookPhr h2").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".introCon").html(),
            detail: "作者： " + author + "<br>" + doc.select(".bookPhr dd").get(1).text(),
            host: "http://www.qiushubang.com"
        });
    }
    return null;
}