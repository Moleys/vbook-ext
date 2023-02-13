function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img,"https://nftstorage.link")
    let response = fetch(url + "/content.opf");
    if (response.ok) {
        let doc = response.html();
        console.log(doc)
        let coverImg = doc.select("item#cover").first().attr("href");
        coverImg = url + "/" + coverImg;
        let author =  doc.select("dc|creator").text();
        return Response.success({
            name: doc.select("dc|title").text(),
            cover: coverImg,
            author: author,
            description: doc.select("dc|description").html().replace(/&lt;/g,"<").replace(/&gt;/g,">"),
            detail: "Tác giả： " + author ,
            host: "https://nftstorage.link"
        });
    }
    return null;
}