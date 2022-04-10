function execute() {

    var doc = Http.get("https://novelfull.com").html();

    var genre = [];
    if (doc) {
        var listGenre = doc.select(".list-cat .col-xs-6 a");

        listGenre.forEach(ge => genre.push({
                title: ge.attr("title"),
                input: "https://novelfull.com" + ge.attr("href") + "?page=",
                script: "gen.js"
            }))
        return Response.success(genre);
    }
    return null;
}
// link send gen.js : https://novelfull.com/genre/Shounen