function execute(url) {
    url = url.replace('m.wucuo8.com', 'www.wucuo8.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".xs-img.fl img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.wucuo8.com" + coverImg;
        }

        let author =  doc.select("p.writer.ellipsis").first().text().replace(/作\s*者：/g, "");
        let checkDownload = ""
        checkDownload = doc.select(".downloadbox a:contains(立即下载)").text();
        let name = doc.select(".xs-info h1.ellipsis").text();
        let checkFull = name.split("txt")[1]
        if(checkDownload.length === 0){
            checkDownload = "Chưa có link Download TXT"
        }
        else{
            checkDownload = "Đã có link Download TXT"
        }
        console.log(checkDownload)
        return Response.success({
            name: name.split("txt")[0],
            cover: coverImg,
            author: author,
            description: "<h1>Đây là trang web tải TXT truyện</h1><br><h2>" +checkDownload +"</h2><br><h3>" + checkFull +"</h3><br"  +  doc.select("div.nr-jianjie").first().html(),
            detail: "作者： " + author + "<br>" + doc.select("div.xs-info p:contains(TXT大小)").first().text()+ "<br>" + doc.select("div.xs-info p:contains(分类：)").first().text(),
            host: "https://www.wucuo8.com"
        });
    }
    return null;
}