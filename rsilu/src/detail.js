function execute(url) {
    url = url.replace("www.rsilu.com", "book.rsilu.com");
    let response = fetch(url + "/");

    if (response.ok) {
        let doc = response.html('gbk');
        return Response.success({
            name: doc.select(".block_txt2 h2").first().text(),
            cover: doc.select(".block_img2 img").first().attr("src").replace("_85x100.jpg","_200x250.jpg"),
            author: doc.select(".block_txt2 a[href~=author]").text(),
            description: doc.select(".intro_info").html(),
            detail: doc.select(".block_txt2").html(),
            host: "https://www.rsilu.com",
            ongoing: doc.select(".block_txt2").html().indexOf("连载中") >= 0
        });
    }
    return null;
}