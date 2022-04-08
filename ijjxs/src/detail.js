function execute(url) {
    url = url.replace('m.ijjxs.com', 'www.ijjxs.com');
       
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".downInfoRowL img").first().attr("src");
        if (coverImg.startsWith("//")) {
            coverImg = "https:" + coverImg;
        }
        let author = doc.select(".zuozhe a").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select("#downInfoArea h1").text().replace("《","").replace("》",""),
            cover: coverImg,
            author: author,
            description: doc.select("#mainSoftIntro").text(),
            detail: author +"<br>" + doc.select(".downInfoRowL li").get(5).text(),
            host: "http://www.ijjxs.com"
        });
    }
    return null;
}