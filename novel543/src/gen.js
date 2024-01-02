load('config.js');
function execute(url, page) {
	  url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(BASE_URL + url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select(".news li").forEach(e => {
            data.push({
                name: e.select("h3 a").first().text(),
                link: BASE_URL + e.select("a").first().attr("href"),
                description: e.select(".author").text(),
                host: BASE_URL
            })
        });


        return Response.success(data)
    }
    return null;
}