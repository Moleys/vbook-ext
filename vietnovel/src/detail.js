function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let ongoing = doc.select(".table-borderless tr").first().text().indexOf("Còn tiếp") >= 0
        let detail0 =  doc.select(".table-borderless tr").get(2).select("td a");
        let cate  = "";
        detail0.forEach(e => {
            cate = cate + e.text().trim() + ", "
        });
        if(cate.trim().slice(-1) === ",")
            cate = cate.trim().slice(0, -1)
        let author = doc.select(".novel-detail-author-name").text();
        
        return Response.success({
            name: doc.select("h1.novel-title").text(),
            cover: doc.select('meta[property="og:image"]').attr("content"),
            author: author,
            description: doc.select(".novel-summary").html(),
            detail: "Tác giả: " + author + "<br>" + "Thể loại: " +  cate,
            host: "https://www.vietnovel.com",
            ongoing: ongoing
        });
    }
    return null;
}