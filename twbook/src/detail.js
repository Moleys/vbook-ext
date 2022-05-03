function execute(url) {
    url = url.replace('m.twbook.cc', 'www.twbook.cc');
    if(url.slice(-1) !== "/")
        url = url + "/"
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".detail .bookimg img").first().attr("src");
        let author = doc.select(".detail p a").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".intro").text(),
            detail:  "作者：" + author + "<br>更新：" + doc.select(".i_history").text()+ "<br>分類：" + doc.select(".detail p a").get(1).text(),
            host: "http://www.twbook.cc"
        });
    }
    return null;
}