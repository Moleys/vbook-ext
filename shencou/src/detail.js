function execute(url) {
    if(url.includes("www.shencou.com")){
        let book_id = url.match(/books\/read_(\d+).html/)[1];
        url = "http://m.shencou.com/info.php?aid=" + book_id;
    }
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let coverImg = doc.select(".tu img").first().attr("src");
        let author =  doc.select(".tab p.p1").first().text().replace(/作\s*者：/g, "");
        let detail = doc.select(".tab");
        detail = Html.clean(detail, ["p"]);
        let description = doc.select(".jj .p2").html().split("<br>")[0].replace(/ 　　/g,"<br>");
        let ongoing = doc.select(".tab1 p.p5").text()
        return Response.success({
            name: doc.select(".inh1 h1").text(),
            cover: coverImg,
            author: author,
            description: description,
            detail: detail,
            ongoing: ongoing.indexOf("已完结") === -1,
            host: "http://www.shencou.com"
        });
    }
    return null;
}