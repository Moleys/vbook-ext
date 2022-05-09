function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let  title = doc.select("title").first().text().replace("<![CDATA[","").replace("]]>","");
        return Response.success({
            name: title.split("-")[1].trim(),
            cover: "coverImg",
            author: "Báo Tuổi Trẻ",
            description: title.replace(" - RSS Feed",""),
            host: "http://tuoitre.vn"
        });
    }
    return null;
}