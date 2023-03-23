function execute(url, page) {
    if (!page) page = '1';
    url = url.replace('m.shumilouxs.com', 'www.shumilouxs.com');
    let response = fetch(url + "/" + page + ".html");
    console.log(url + "/" + page + ".html")
    if (response.ok) {
        let doc = response.html();
        const data = [];

        doc.select("#newscontent .l li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: e.select(".s2 a").first().attr("href"),
                cover: "http://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/0.png",
                description: e.select(".s3 a").first().text(),
                host: "http://www.shumilouxs.com"
            })
        });
        doc.select("#pagelink a").last().remove();
        let next = doc.select("#pagelink a").last().attr("href").replace(".html", "").split(/[/ ]+/).pop();


        return Response.success(data, next)
    }
    return null;
}