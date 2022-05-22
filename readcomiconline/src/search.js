function execute(key, page) {

    if(!page) page = '1';
    let response = fetch('https://readcomiconline.li/Search/Comic?keyword='+key);

    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".list-comic .item").forEach(e => {
            let coverImg = e.select("img").first().attr("src")
            if (coverImg.startsWith("/")) {
                coverImg = "https://readcomiconline.li" + coverImg;
            }
            data.push({
                name: e.select("span.title").first().text(),
                link: "https://readcomiconline.li" + e.select("a").first().attr("href"),
                cover:  coverImg,
                description: "",
                host: "https://readcomiconline.li"
            })
        });

        return Response.success(data);
    }
    return null;
}