function execute(url, page) {
    if (!page) page = '1';
    let int = parseInt(page);
    let num = 24 * (int - 1);
    let cate_api = "https://api3-normal-lf.fqnovel.com/reading/bookapi/new_category/landing/v/?word_number=0&book_status=2&category_id={cate}&offset={page}&genre_type=0&limit=24&sort_by=24&source=front_category&query_gender=1&iid=1099935039893805&aid=1967&app_name=novelapp&version_code=287"
    if (!page) page = '0';
    url = cate_api.replace("{page}",num.toString()).replace("{cate}",url)
    let response = fetch(url);
    if (response.ok) {
        let res_json = response.json();
        var data = res_json.data
        var allBook2 = data.book_info
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
        
        var next = parseInt(page) + 15;
        return Response.success(book, next.toString())      
    }
    return Response.success(json, num.toString());
}