load('config.js');
function execute(url) {
    const doc = fetch(url).html()
    let cover = doc.select('meta[property="og:image"]').attr("content")
    let detail = doc.select('div.p-2.leading-7.text-justify')
    let update = detail.select("p").first().text()
    let author = detail.select("p").get(2).text().replace("Tác giả: ","")
    return Response.success({
        name: doc.select("h1").text(),
        cover: cover,
        description: doc.select("div.block.text-xl.text-justify.whitespace-pre-line.font-content").html(),
        detail: "Tác giả: " + author +"<br>" + update,
        author: author,
        host: BASE_URL
    });
}