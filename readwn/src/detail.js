function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select("figure.cover img").first().attr("data-src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.readwn.com" + coverImg;
        }
        let author =  doc.select("#novel > header > div > div.novel-info > div.main-head > div.author > span:nth-child(2)").text()
        let cate = doc.select("#novel > header > div > div.novel-info > div.categories > ul").text()
        let ongoing = doc.select("#novel > header > div > div.novel-info > div.header-stats > span:nth-child(2) > strong").text()
        return Response.success({
            name: doc.select("#novel > header > div > div.novel-info > div.main-head > h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select("#info > div.summary > div").html(),
            detail: "Author： " + author + "<br>" + cate,
            ongoing: ongoing !== "Completed",
            host: "https://www.readwn.com"
        });
    }
    return null;
}