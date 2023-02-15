function execute(url, page) {
    if (!page) page = '1';
    let int = parseInt(page);
    let num = 24 * (int - 1);

    var json = Http.get(url).string();
    if(json){
        var data = JSON.parse(json).data
        var allBook = data.cell_view.book_data
        const book = [];
        for (var i = 0; i < allBook.length; i++) {
            var item = allBook[i]        
            book.push({
                name: item.original_book_name,
                link: "https://cachua.cf/book/"+item['book_id'],
                cover: item['thumb_url'],
                description: item['rank_score'],
                host: "https://cachua.cf"
            })
        }
        var next = parseInt(page) + 1;
        return Response.success(book, next.toString())      
    }
    return Response.success(json);
}