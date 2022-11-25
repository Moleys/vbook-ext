function execute(url) {
       
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        var el = doc.select("div.info div.list div.item");
        let detail = "";

        for (var i = 0; i < el.size(); i++) {
            detail += el.get(i).text() + "<br>";
        }
        return Response.success({
            name: doc.select("h1.title").text(),
            cover: doc.select("div.thumb img.img-responsive").attr("src"),
            host: "https://botruyen.vip",
            author: doc.select("div.info div.item a").first().text(),
            description: doc.select("div.brief").html(),
            detail: detail,
            ongoing: detail.indexOf("Đang ra") > 0
        });
    }
    return null;
}
    

