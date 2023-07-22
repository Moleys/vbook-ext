load('config.js');

function execute(url, page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, base_url);
    if (!page) page = '1';
    let response = fetch(url + page + ".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("#newscontent .l li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: "http://www.ibiquzw.com" + e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.ibiquzw.com"
            })
        });

        let next = parseInt(page,10)+1;
        return Response.success(data, next.toString());
    }
    return null;
}