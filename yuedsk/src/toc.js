function execute(url) {
	url = url.replace('m.yuedsk.com', 'www.yuedsk.com');
    let book_id = url.match(/\/book\/(\d+)\/?$/)[1]
    console.log(book_id)
    let folder_id = Math.floor(book_id / 1000);
    let url1  = "http://www.yuedsk.com/html/"+folder_id.toString()+"/"+book_id+"/"
    console.log(url1)
    let response = fetch(url1);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("ul.chapters li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "http://www.yuedsk.com"
            })
        }
        return Response.success(data);
    }
    return null;
}