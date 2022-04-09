function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("div.summary_image img").first().attr("src");

        return Response.success({
            name: doc.select(".post-title h1").text(),
            cover: coverImg,
            author: doc.select("div.author-content a").first().text(),
            description: doc.select(".summary__content").text(),
            detail: doc.select("div.author-content a").first().text(),
            host: "https://coloredmanga.com"
        });
    }
    return null;
}