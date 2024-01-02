load('config.js');
function execute(url, page) {
	  url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if(url.slice(-1) !== "/")
        url = url + "/";
    if(!page) page = '1';
    let response = fetch(BASE_URL+url+"?page="+page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select("ul.list li").forEach(e => {
            data.push({
                name: e.select("h3 a").first().text(),
                link: BASE_URL + e.select("a").first().attr("href"),
                cover: e.select("a img").first().attr("src"),
                description: e.select("p").first().text().split("|")[0],
                host: BASE_URL
            })
        });
        let next = doc.select("ul.pagination-list li.next a").attr("href").split(/[= ]+/).pop();
        return Response.success(data,next)
    }
    return null;
}