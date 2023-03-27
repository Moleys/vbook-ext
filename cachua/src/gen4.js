function execute(url, page) {
    if (!page) page = '1';
    let int = parseInt(page);
    let num = 10 * (int - 1);
    if (!page) page = '0';
    url = url.replace("{page}",num.toString())
    let response = fetch(url);
    if (response.ok) {
        let res_json = response.json();
        var data = res_json.data
        var allBook2 = data.cell_view.book_data
        const book = [];
        for (var i = 0; i < allBook2.length; i++) {
            var item2 = allBook2[i]        
            book.push({
                name: item2.original_book_name,
                link: "https://cachua.cf/book/"+item2['book_id'],
                cover: item2['thumb_url'],
                description: item2['rank_score'],
                host: "https://cachua.cf"
            })
        }
        
        var next = parseInt(page) + 1;
        return Response.success(book, next.toString())      
    }
    return Response.success(json, num.toString());
}