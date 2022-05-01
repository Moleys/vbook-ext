function execute(url) {
    url = url.replace('m.mijiashe.com', 'www.mijiashe.com');
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("#fmimg img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.mijiashe.com" + coverImg;
        }
        let detail = doc.select("#info").first()
        let author = detail.select("p").first().text().replace(/作\s*者：/g, "").replace("作 者:","").trim()
        let name = detail.select("h1").text()
        detail.select("p").last().remove()
        detail.select("h1").remove()
        let description = doc.select("#intro").last()
        description.select("p").last().remove()
        return Response.success({
            name: name,
            cover: coverImg,
            author: author,
            description: description.html(),
            detail: detail.html().replace(/\&nbsp;/g, ""),
            host: "https://www.mijiashe.com"
        });
    }
    return null;
}