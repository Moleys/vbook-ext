function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("#content img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://zxcs.me" + coverImg;
        }
        let name = doc.select("#content h1").text();
        let author =  name.split("作者：")[1];
        let checkDownload = "Đã có link Download TXT"
        let checkFull = name.split("（")[1].split("）")[0]
        console.log(checkDownload)
        return Response.success({
            name: name.split("》")[0].replace("《",""),
            cover: coverImg,
            author: author,
            description: "<h1>Đây là trang web tải TXT truyện</h1><br><h2>" +checkDownload +"</h2><br><h3>" + checkFull +"</h3><br"  +  doc.select("#content p").get(2).html(),
            detail: "作者： " + author + "<br>" + doc.select("p.fileinfo span").last().text(),
            host: "http://zxcs.me"
        });
    }
    return null;
}