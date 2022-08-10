function execute(url) {
    let response = fetch(url+"/");
    if (response.ok) {
        let doc = response.html('gbk');
        // let coverImg = doc.select("img.img-thumbnail").first().attr("src");
        // if (coverImg.startsWith("/")) {
        //     coverImg = "https://www.po18gv.vip" + coverImg;
        // }
        let author =  doc.select("h1.bookTitle small a").text().trim();
        return Response.success({
            name: doc.select(".breadcrumb li.active").text().trim(),
            // cover: coverImg,
            author: author,
            description: doc.select("#bookIntro").text(),
            detail: "作者： " + author,
            host: "https://www.po18gv.vip"
        });
    }
    return null;
}