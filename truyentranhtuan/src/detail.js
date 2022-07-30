function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".manga-cover img").first().attr("src");
        let author =  doc.select("p.misc-infor:contains(Tác giả:)").text().replace("Tác giả:", "").slice(0, -1).trim().replace(/ , /g,", ");
        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select("#manga-summary").first().html(),
            detail: doc.select(".misc-infor").html(),
            host: "http://truyentranhtuan.com",
            ongoing: doc.select("p.misc-infor").last().text().indexOf("Đang tiến hành") >= 0
        });
    }
    return null;
}