function execute(url, page) {
    if(!page) page = '1';
    let response = fetch(url+"/" +page+ ".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("ul.librarylist li").forEach(e => {
            let cover = "";
            let cover_img = e.select("img").attr("src")
            if(cover_img.includes("nocover") == false){
                cover = "https://www.aduosw.com" + cover_img;
            }
            data.push({
                name: e.select("p.info a.novelname").first().text(),
                link: e.select("p.info a.novelname").first().attr("href"),
                cover: cover,
                description:e.select("p.info a").last().text(),
                host: "https://www.aduosw.com"
            })
        });
        let next = doc.select(".footer.pagination").select("a.current + a").first().text();
        return Response.success(data, next);   
    }
    return null;
}