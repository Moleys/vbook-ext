function execute(url) {
    url = url.replace('m.80k.net', 'www.80k.net');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let temp1 = "";
        try {
                temp1 = doc.select("script").html();
                temp1 = "https://www.80k.net/image/" +temp1.split("cover:\"")[1].split("\",")[0];
        } 
        catch(err) {}
        let author = doc.select("div.book-author").first().text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select("h1.book-name").text(),
            cover: temp1,
            author: author,
            description: doc.select(".line-2").text(),
            detail: "作者： " + author + "<br>" + doc.select("div.book-chapter").last().text(),
            host: "http://www.80k.net"
        });
    }
    return null;
}