function execute(url) {
    url = url.replace('m.bijibaba.com', 'www.bijibaba.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".BGsectionOne-top-left img").first().attr("src");
        let  name = doc.select("p.title").text();
        let author = doc.select("p.author").first().text().replace(/作\s*者：/g, "");
        let detail = doc.select(".BGsectionOne-top-right");
        detail.select("p.title").remove()
        return Response.success({
            name: name,
            cover: coverImg,
            author: author,
            description: doc.select("#intro").text(),
            detail: detail.html(),
            host: "http://www.bijibaba.com"
        });
    }
    return null;
}