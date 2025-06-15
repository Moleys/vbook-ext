
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    if(url.slice(-1) === "/")
        url = url.slice(0, -1);
    let book_id = url.split(/[/ ]+/).pop();
    url = BASE_URL + "/book/" + book_id;
    let response = fetch(url)
    if (response.ok) {
		let doc = response.html();
        let webtit = doc.select("title").text()
        let [_, title, author] = webtit.match(/《(.+?)》\s–\s(.+)/) || [];
        author = author.replace("Koroneko Corp","").trim()
        let description = doc.select(".MuiStack-root").last().html()
        let uptime =doc.select(".MuiStack-root").get(3).text()
        let cover = re_cover(doc.select("img.lazyload").first().attr("data-src"))

        return Response.success({
            name: title,
            author: author,
            description: "简介：<br>" + description,
            cover: cover,
            detail: "作者：" + author + "<br>：" +uptime,
            host: BASE_URL
        });
    }
    return null;
}
