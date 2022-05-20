function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let coverImg = doc.select(".tpc_content").first().select("img").first().attr("src");
        let author = doc.select("h1#subject_tpc a").get(2).text();
        let description = doc.select("#read_tpc").first()
        description.select("img").remove()
        description.select(".notice").remove()
        description = description.html()
        return Response.success({
            name: doc.select("h1#subject_tpc a").get(1).text(),
            cover: coverImg,
            author: author,
            description: doc.select("h1#subject_tpc").text() +"<br>" + description,
            detail: "作者： " + author + "<br>" +doc.select("h1#subject_tpc a").get(0).text(),
            host: "https://www.liudabook.com"
        });
    }
    return null;
}