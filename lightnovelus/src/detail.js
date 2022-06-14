function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html().select(".collection-container.flex");
        let coverImg = doc.select("div.collection-cover").first().attr("style").split("(")[1].split(")")[0];
        let description = doc.select(".btm-intro-btns .intro").text().replace(/\n/g,"<br>")
        let author =  doc.select(".top-title p").first().text().replace(/作\s*者:/g, "").trim();
        return Response.success({
            name: doc.select(".top-title h3.title.fs-md").text(),
            cover: coverImg,
            author: author,
            description: description,
            detail: "作者： " + author,
            host: "https://www.lightnovel.us"
        });
    }
    return null;
}