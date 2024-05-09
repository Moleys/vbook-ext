function execute(url) {
    url = url.replace('m.twbook.cc', 'www.twbook.cc');
    if(url.slice(-1) !== "/")
        url = url + "/"
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select("#detail .cover img").attr("src");
        let author = doc.select(".author").first().text();
        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".intro").text(),
            detail:  doc.select(".meta").html(),
            host: "http://www.twbook.cc"
        });
    }
    return null;
}