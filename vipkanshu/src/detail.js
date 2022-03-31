function execute(url) {
    url = url.replace('m.vipkanshu.vip', 'www.vipkanshu.vip');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".cover img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.vipkanshu.vip" + coverImg;
        }
        return Response.success({
            name: doc.select("#info h2").text(),
            cover: coverImg,
            author: doc.select(".small span").first().text().replace(/作\s*者：/g, ""),
            description: doc.select(".intro").text(),
            detail: doc.select(".small span.last").html(),
            host: "https://www.vipkanshu.vip"
        });
    }
    return null;
}