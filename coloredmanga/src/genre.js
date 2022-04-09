function execute() {
    const doc = Http.get("https://coloredmanga.com/blog/manga-genre/action/").html();
    const el = doc.select(".genres ul > li a");
    const data = [];
    for (var i = 3; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
           title: e.text(),
           input: e.attr('href'),
           script: 'cat.js'
        });
    }
    return Response.success(data);
}