function execute(url, page) {
	url = url.replace('m.uuks.org', 'www.uuks.org');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("#main1 li").forEach(e => {
            data.push({
                name: e.select(".sm a").first().text(),
                link: e.select(".sm a").first().attr("href"),
                description: e.select(".zj a").first().text(),
                host: "http://www.uuks.org"
            })
        });

		if (data.length === 0) {

            const el = doc.select(".content > .list-item")

            for (var i = 0; i < el.size(); i++) {
                var e = el.get(i);
                var coverImg = e.select("img").first().attr("src");
                if (coverImg.startsWith("/")) {
                    coverImg = "https://www.uuks.org" + coverImg;
                }
                data.push({
                    name: e.select(".book-info > h3").first().text(),
                    link: e.select(".book-info a").first().attr("href"),
                    cover: coverImg,
                    description: e.select("dl > .book-item").get(1).text(),
                    host: "https://www.uuks.org"
                })
            }


		}


        return Response.success(data)
    }
    return null;
}