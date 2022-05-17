function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("img.media-object.img-rounded").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://lnmtl.com" + coverImg;
        }
        let author =  doc.select(".panel-body dd span.label.label-primary").first().text();
        return Response.success({
            name: doc.select("h2 .novel-name small").text(),
            cover: coverImg,
            author: author,
            description: doc.select("div.description").text(),
            detail: "作者： " + author + "<br>" + doc.select("#info p").last().text(),
            host: "https://lnmtl.com"
        });
    }
    return null;
}