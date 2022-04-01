function execute(url) {
    url = url.replace('m.twbook.cc', 'www.twbook.cc');
    if(url.slice(-1) !== "/")
        url = url + "/"
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".detail .bookimg img").first().attr("src");

        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: doc.select(".detail p a").first().text().replace(/作\s*者：/g, ""),
            description: doc.select(".intro").text(),
            detail: doc.select(".i_history").text(),
            host: "http://www.twbook.cc"
        });
    }
    return null;
}