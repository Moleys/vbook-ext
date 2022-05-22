function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select('link[rel=\"image_src\"]').first().attr("href");
        if (coverImg.startsWith("/")) {
            coverImg = "https://readcomiconline.li" + coverImg;
        }
        let author =  doc.select(".barContent p").get(2).select("a").text();
        return Response.success({
            name: doc.select(".barContent a.bigChar").text(),
            cover: coverImg,
            author: author,
            description: doc.select('.barContent p[style*="text-align: justify;"]').text(),
            detail: Html.clean(doc.select(".barContent p"), ["p"]).replace(/\&nbsp;/g, " "),
            host: "https://readcomiconline.li"
        });
    }
    return null;
}