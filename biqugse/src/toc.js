function execute(url) {
	url = url.replace('www.biqugse.com', 'm.biqugse.com');
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
	url = url.replace('m.biqugse.com/', 'm.biqugse.com/list/') + ".html";

    console.log(url)

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#chapterlist").last()
        let el = el1.select("p a")
        const data = [];
        for (let i = 1;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: 'http://www.biqugse.com'+e.attr("href"),
                host: "http://www.biqugse.com"
            })
        }
        return Response.success(data);
    }
    return null;
}