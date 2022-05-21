function execute(url, page) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    if(!page) page = '1';
	url = url.replace('m.duread8.com', 'www.duread8.com');
    let response = fetch(url+page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("li.next a").attr("href").split(/[/ ]+/).pop();        

		doc.select(".books-section .book-list li").forEach(e => {
            data.push({
                name: e.select("a.title").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select(".avatar img").first().attr("data-original"),
                description: "",
                host: "https://www.duread8.com"
            })
        });


        return Response.success(data,next)
    }
    return null;
}