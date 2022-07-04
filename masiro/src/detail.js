function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".mailbox-attachment-icon.has-img img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://masiro.me" + coverImg;
        }
        let ongoing = doc.select(".n-status").text().replace("状态 :","").trim()
        let author =  doc.select(".author a").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select(".novel-title").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".box-footer").first().select(".brief").html(),
            detail: "作者： " + author + "<br>" + doc.select(".tags").text(),
            ongoing: ongoing.indexOf("连载中") === 0,
            host: "https://masiro.me"
        });
    }
    return null;
}