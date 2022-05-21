function execute(key, page) {

    if(!page) page = '1';
    let response = fetch('https://duread8.com/index/get_search_book_list/'+key+"/"+page);

    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("li.next a").attr("href").split(/[/ ]+/).pop();        
		doc.select(".books-section .book-list li").forEach(e => {
            data.push({
                name: e.select("a.book-name").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select(".avatar img").first().attr("data-original"),
                description: "",
                host: "https://www.duread8.com"
            })
        });

        return Response.success(data,next);
    }
    return null;
}