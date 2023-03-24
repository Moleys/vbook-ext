function execute(url) {
    url = url.replace('m.shumilouxs.com', 'www.shumilouxs.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select('meta[property="og:image"]').attr("content");
        let descriptionMeta = doc.select('meta[property="og:description"]').attr("content");
        let title = doc.select('meta[property="og:title"]').attr("content");
        let status = doc.select('meta[property="og:novel:status"]').attr("content");
        let newUpdate = doc.select('meta[property="og:novel:update_time"]').attr("content");
        let author = doc.select('meta[property="og:novel:author"]').attr("content");
        let category = doc.select('meta[property="og:novel:category"]').attr("content");

        if (coverImg.startsWith("/")) {
            coverImg = "https://www.shumilouxs.com" + coverImg;
        }
        return Response.success({
            name: title,
            cover: coverImg,
            author: author,
            description: ("<br>Thể loại: <br>") + category + ("<br>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br>") + "Tình trạng: " + status + ("<br>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br>") + descriptionMeta,
            detail: "作者：" + author + ("<br>⠀⠀⠀⠀⠀⠀⠀⠀<br>") + "Mới nhất: " + newUpdate,
            host: "https://www.shumilouxs.com"
        });
    }
    return null;
}

// function execute(url) {
//     url = url.replace('m.shumilouxs.com', 'www.shumilouxs.com');
//     let response = fetch(url);
//     if (response.ok) {

//         let doc = response.html();
//         let coverImg = doc.select("#fmimg img").first().attr("data-original");
//         if (coverImg.startsWith("/")) {
//             coverImg = "http://www.shumilouxs.com" + coverImg;
//         }
//         let author = doc.select("#info p").first().text().replace(/作\s*者：/g, "");
//         return Response.success({
//             name: doc.select("#info h1").text(),
//             cover: coverImg,
//             author: author,
//             description: doc.select("#intro").text(),
//             detail: "作者： " + author + "<br>" + doc.select(".hidden-xs").get(2).text(),
//             host: "http://www.shumilouxs.com"
//         });
//     }
//     return null;
// }