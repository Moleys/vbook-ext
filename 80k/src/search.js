function execute(key, page) {
    if(!page) page = '1';
    let response = fetch('https://www.80k.net/search/'+key+"/0_"+page);

    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = parseInt(page, 10)+1;        
		doc.select("div.search-list .book-item").forEach(e => {
            data.push({
                name: e.select("img").first().attr("alt"),
                link: "https://www.80k.net" + e.select("a").first().attr("href"),
                description: "",
                host: "https://www.80k.net"
            })
        });

        return Response.success(data,next);
    }
    return null;
}