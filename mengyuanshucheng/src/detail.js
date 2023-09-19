function execute(url) {
    url = url.replace('wap.mengyuanshuchengcn.com', 'www.mengyuanshuchengcn.com');
    url = url.replace("/index/","/my/")
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select('meta[property="og:image"]').attr("content");
        let descriptionMeta = doc.select('meta[property="og:description"]').attr("content").replace("r>","").replace("《",'"').replace("》",'"');

        let title = doc.select('meta[property="og:title"]').attr("content");
        let status = doc.select('meta[property="og:novel:status"]').attr("content");
        let newChap = doc.select('meta[property="og:novel:latest_chapter_name"]').attr("content");
        let author = doc.select('meta[property="og:novel:author"]').attr("content");
        let category = doc.select('meta[property="og:novel:category"]').attr("content");
        let updateTime = doc.select('meta[property="og:novel:update_time"]').attr("content").replace(/\d\d:\d\d:\d\d/g, "");

        if (coverImg.startsWith("/")) {
            coverImg = "https://www.mengyuanshuchengcn.com" + coverImg;
        }
        return Response.success({
            name: title,
            cover: coverImg,
            author: author,
            description: descriptionMeta,
            detail: "Thể loại: " + category + '<br>' + "Tình trạng: " + status + '<br>' + "Mới nhất: " + newChap  + '<br>' + "Thời gian cập nhật: " + updateTime,
            host: "https://www.mengyuanshuchengcn.com"
        });
    }
    return null;
}