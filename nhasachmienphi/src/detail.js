function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        // doc.select(".mg-t-10").remove();
        let coverImg = doc.select(".col-xs-12.col-sm-4.col-md-4.col-lg-4 img").first().attr("src");
        let author = doc.select(".col-xs-12.col-sm-8.col-md-8.col-lg-8").last().select(".mg-t-10").last().text()
        if (coverImg.startsWith("/")) {
            coverImg = "http://nhasachmienphi.com" + coverImg;
        }

        let el1 = doc.select(".box_chhr").last().text();
        let description = doc.select(".gioi_thieu_sach").text();
        if(el1.length === 0){
            description = "<h1>KHÔNG HỖ TRỢ ĐỌC TRÊN VBOOK</h1><br><br>" + description;
        }
        let theloai = doc.select(".mg-tb-10").text().replace("Thể loại:","").trim();
        console.log(theloai)
        return Response.success({
            name: doc.select("h1.tblue").text(),
            cover: coverImg,
            author: author.replace("Tác giả: ", ""),
            description: description,
            detail: author +  "<br>" + doc.select(".mg-tb-10").text(),
            host: "http://nhasachmienphi.com",
            type: theloai==="Truyện Tranh" ? "comic" : "novel"

        });
    }
    return null;
}