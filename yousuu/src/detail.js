function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();

        let coverImg = doc.select(".card-bookInfo-cover").first().attr("cover");;
        // doc.select("ul li ul").remove();
        doc.select('script[data-n-head="ssr"]').remove();

        let metaDescription = doc.select('meta[name="description"]').first().attr("content");
        let descriptionArr = metaDescription.split("深度解析。");

        let scriptText = doc.select('script').first().toString();


        
        let tempScore = scriptText.split(",score:");
        let tempScore1 = tempScore[1].split(",")[0];
        let tempScorerCount = scriptText.split(",scorerCount:");
        let tempScorerCount1 = tempScorerCount[1].split(",")[0];
        console.log(tempScorerCount1) //W=60, U =40??? F==25 ===> Array(2) tỷong script
        // let scriptText = Html.clean(doc, ["script"]).text().toString()
        console.log(scriptText)
        console.log("az")


        return Response.success({
            name: doc.select("h1.book-name").first().text(),
            cover: coverImg,
            author: doc.select("p.book-author").first().text().replace(/作\s*者：/g, ""),
            description: descriptionArr[1],
            // detail: doc.select(".book-status span").html(),
            detail: "[" +  tempScore1 + "/10]",
            host: "https://www.yousuu.com"
        });
    }
    return null;
}