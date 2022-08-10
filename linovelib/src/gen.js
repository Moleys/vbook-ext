function execute(url, page) {
    if(!page) page = '1';
    let response = fetch(url+"/" +page+".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select("ol#list_content li.book-li").forEach(e => {
            let name = e.select("h4.book-title").first().text();
            if(name){
                data.push({
                    name: name,
                    link: e.select("a").first().attr("href"),
                    description: e.select(".book-author").first().text().split("作者 ")[1],
                    cover: e.select("img.book-cover").first().attr("data-original"),
                    host: "http://w.linovelib.com"
                })
            }
        });
        let next = doc.select("#pagelink").select("strong + a").first().text();
        return Response.success(data, next);
    }
    return null;
}