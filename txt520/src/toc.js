function execute(url) {
	url = url.replace('m.txt520.com', 'www.txt520.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let chapter_link = "http://www.txt520.com" + doc.select(".readnow").attr("href");
        let response_chapter = fetch(chapter_link);
            if (response_chapter.ok) {
                let doc_ch = response_chapter.html();
                let el1 = doc_ch.select(".list").last();
                let el = el1.select("li a")
                const data = [];
                for (let i = 0;i < el.size(); i++) {
                    var e = el.get(i);
                    data.push({
                        name: e.select("a").text(),
                        url:"http://www.txt520.com" + e.attr("href"),
                        host: "http://www.txt520.com"
                    })
                }
            }


        return Response.success(data);
    }
    return null;
}