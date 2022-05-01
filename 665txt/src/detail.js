function execute(url) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    url = url.replace('www.665txt.com', 'wap.665txt.com').replace('m.665txt.com', 'wap.665txt.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let coverImg = doc.select(".block_img2 img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.665txt.com" + coverImg;
        }
        let author =  doc.select(".block_txt2 p").get(2).text().replace(/作\s*者：/g, "");
        return Response.success({
            name: doc.select("h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".intro_info").text(),
            detail: doc.select(".block_txt2").html(),
            host: "http://www.665txt.com"
        });
    }
    return null;
}