function execute(url) {

    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = "https://wsrv.nl/?url="+doc.select(".product-gallery img").first().attr("src")+"&w=225&h=300&fit=cover&output=webp";
        let genres = [];
        let a_gen = doc.select(".widget-tags a.tag")
        a_gen.forEach(e => {
            genres.push({
                title: e.text(),
                input: e.attr("href"),
                script: "gen.js"
            })
        });
        let detail0 = doc.select(".book-detail").html()
        let author = doc.select("ul.book-detail a").first().text()

        let view =  doc.select("#vtimes").first().text()

        let score =  doc.select("#favorite").first().text()
        let txt =  doc.select("#txt").first().text()


        return Response.success({
            name: doc.select("h2").text(),
            cover: coverImg,
            author: doc.select("ul.book-detail a").first().text(),
            description: doc.select(".description").html(),
            detail: `Author: ${author}<br>View: ${view}分<br>Like: ${score}<br>Word: ${txt}`,
            genres: genres,
            host: "https://www.esjzone.cc"
        });
    }
    return null;
}