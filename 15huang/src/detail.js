function execute(url) {
    url = url.replace('m.15huang.com', 'www.15huang.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("img.load").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.15huang.com" + coverImg;
        }
        let checkFull = doc.select("title").text().split("txt")[1].split("_")[0]

        let author =  doc.select("p.book-writer a").first().text();
        let checkDownload = ""
        checkDownload = doc.select(".downurl a:contains(立即下载)").text()
        if(checkDownload.length === 0){
            checkDownload = "Chưa có link Download TXT"
        }
        else{
            checkDownload = "Đã có link Download TXT"
        }
        console.log(checkDownload)
        return Response.success({
            name: doc.select("h1.book-title").text(),
            cover: coverImg,
            author: author,
            description: "<h1>Đây là trang web tải TXT truyện</h1><br><h2>" +checkDownload +"</h2><br><h3>" + checkFull +"</h3><br"  +  doc.select(".xs-instro p").first().html(),
            detail: "作者： " + author + "<br>" + doc.select("div.xs-cell p:contains(文件大小)").last().text(),
            host: "https://www.15huang.com"
        });
    }
    return null;
}