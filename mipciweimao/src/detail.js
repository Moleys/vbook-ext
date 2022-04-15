function execute(url) {
    url = url.replace('wap.ciweimao.com', 'mip.ciweimao.com').replace('www.ciweimao.com', 'mip.ciweimao.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".cover mip-img").first().attr("src");

        return Response.success({
            name: doc.select(".info h3.book").text(),
            cover: coverImg,
            author: doc.select(".cnt-inner h3").first().text().replace(/作\s*者：/g, ""),
            description: doc.select(".desc-cnt").html(),
            detail: doc.select(".info p"),
            host: "https://mip.ciweimao.com"
        });
    }
    return null;
}