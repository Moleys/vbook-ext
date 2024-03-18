load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let name  = doc.select("h1.book_name").text().trim();
        let author = doc.select(".book_author").text().trim();
        let cover = doc.select(".book_cover img").attr("src");
        let description = doc.select(".B_I_content").html()
        let statu0 = doc.select(".statu")
        statu0.select("span").remove()
        let ongoing = statu0.text() !== "已完結"
        let tags = doc.select(".book_intro_tags a")

        let genres = [];
        tags.forEach(e => {
            genres.push({
                title: e.text(),
                input: BASE_URL + e.select("a").attr("href"),
                script: "gen.js"
            })
        });


        return Response.success({
            name: name,
            author: author,
            cover: cover,
            description: description,
            detail: "作者： " + author,
            ongoing: ongoing,
            genres: genres,
            host: BASE_URL
        });
    }
    return null;
}