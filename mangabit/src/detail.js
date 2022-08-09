function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".col-md-4.justify-content-center img").first().attr("src");
        let author =  doc.select(".row.mgb-story-detail-row2:contains(Tác giả)").text().replace("Tác giả ", "").trim();
        let cate =  doc.select(".row.mgb-story-detail-row2:contains(Thể loại) a.mgb-story-detail-genre-item")
        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".mgb-story-detail-description-text").first().html(),
            detail: "Tác giả: " + author +"<br>" + cate,
            host: "https://mangabit.top",
            ongoing: doc.select(".col-md.p-0").last().text().indexOf("Đang tiến hành") >= 0
        });
    }
    return null;
}