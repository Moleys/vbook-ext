function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".ta-left-pic p img").first().attr("src");
        coverImg = "https://wap.cool18.com/" + coverImg
        let authorName = doc.select(".ta-left-pic p").get(1).text();
        let authorQuote = doc.select(".ta-left-pic p").get(2).text();
        let authorViewer = doc.select(".ta-left-look p span").last().text();

        console.log(authorViewer)

        return Response.success({
            name: authorName,
            cover: coverImg,
            author: authorName,
            description: authorQuote,
            detail: authorViewer,
            host: "https://www.cool18.com"
        });
    }
    return null;
}