function execute(url) {
    url = url.replace("wikidich.com", "wikinam.net");
    url = url.replace("wikidth.com", "wikinam.net");
    url = url.replace("wikidth.org", "wikinam.net");
    url = url.replace("wikidth.net", "wikinam.net");
    url = url.replace("wikinu.net", "wikinam.net");
    url = url.replace("wikidichvip.com", "wikinam.net");
    url = url.replace("wikidichz.com", "wikinam.net");

    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();

        let name = doc.select(".cover-info h2").text();
        let author = doc.select(".cover-info").html().match(/tac-gia.*?>(.*?)</);
        if (author) author = author[1];

        let element = doc.select("div.cover-info").first();
        element.select("h2,span,i").remove();

        return Response.success({
            name: name,
            cover: doc.select("div.book-info img").first().attr("src"),
            author: author,
            description: doc.select("div.book-desc-detail").html(),
            detail: element.html(),
            host: "https://wikinam.net",
            ongoing: doc.select(".cover-info").html().indexOf("Còn tiếp") > 0
        });
    }
    return null;
}