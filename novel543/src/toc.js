load('config.js');
function execute(url) {
	url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if(url.slice(-1) !== "/")
        url = url + "/"
    url = url + "dir"
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("ul.all").first()
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: BASE_URL + e.attr("href"),
                host: BASE_URL
            })
        }
        return Response.success(data);
    }
    return null;
}