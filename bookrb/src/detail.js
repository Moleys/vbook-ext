function execute(url) {
    url = url.replace('m.bookrbx.com', 'www.bookrbx.com');
    let url2 =  url.split("/")[3] 
    let url3 = url.replace(".html","").split("/")[4]

    let response = fetch(url);
    if (response.ok) {

        let doc = response.html('gbk');
        let coverImg = "http://www.bookrbx.com/files/article/image/" + url2 + "/"+ url3 +"/"+ url3 +"s.jpg";
        return Response.success({
            name: doc.select("#info h1").text(),
            cover: coverImg,
            author: doc.select("#info p").first().text().replace(/作\s*者：/g, ""),
            description: doc.select("#intro").text(),
            detail: doc.select("#info p").get(2).html(),
            host: "http://www.bookrbx.com"
        });
    }
    return null;
}