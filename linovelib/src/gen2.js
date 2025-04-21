load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    if(!page) page = '1';
    let response = fetch(url+"/" +page+".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("ol.book-ol li.book-li").forEach(e => {
            let name = e.select("h4.book-title").first().text();
            console.log(name)
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
        if(!next){
            next =""
        }
            
        return Response.success(data, next);
    }
    return null;
}