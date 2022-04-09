function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let name = doc.select('h1[itemprop="name"]').text();
        let author = doc.select('meta[name="Author"]').attr("content");
        var ele1 = doc.select(".righttd li");
        let detail = "";
        for (var i = 0; i < 2; i++) {
            detail += ele1.get(i).text() + "<br>";
        }

        let coverImg = doc.select("img.noveldefaultimage").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.jjwxc.net/" + coverImg;
        }

        return Response.success({
            name: name,
            cover: coverImg,
            author: author,
            description: doc.select("#novelintro").html(),
            detail: "作者： " + author  + "<br>" + detail,
            host: "https://www.jjwxc.net/"
        });
    }
    return null;
}