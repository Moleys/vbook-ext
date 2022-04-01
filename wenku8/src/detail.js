function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html('gbk');
		let ele1 =  doc.select('table[width="100%"]').get(2);
        let coverImg = ele1.select("img").first().attr("src");
        let title = doc.select("title").text().split("-");

        return Response.success({
            name: title[0].trim(),
            cover: coverImg,
            author: title[1].trim(),
            description: ele1.select("span").last().text(),
            detail: ele1.select("a").last().html(),
            host: "http://www.wenku8.net"
        });
    }
    return null;
}