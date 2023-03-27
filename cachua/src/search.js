function execute(key) {    
    let response = fetch('https://api5-normal-lf.fqnovel.com/reading/bookapi/search/tab/v/?offset=0&passback=&query='+key+'&search_id=&iid=4330291389300814&aid=1967&app_name=novelapp&version_code=56932&version_name=5.0.4.32&device_platform=android', {
        headers: {
            'user-agent': UserAgent.android()
        }
    });
    if (response.ok) {
        let res_json = response.json();
        let allBook = res_json.search_tabs[0].data;
        const book = [];
        for (var i = 0; i < allBook.length; i++) {
            let item = allBook[i];
            if(item.book_data) {
                let coverImg = item.book_data[0].thumb_url;
                coverImg = "http://p3-novel.byteimg.com/origin/" + coverImg + ".png";
                book.push({ 
                    name: item.book_data[0].original_book_name,
                    description: item.book_data[0].author,
                    cover: coverImg,               
                    link: "https://cachua.cf/book/" +item.book_data[0].book_id,
                    host: "https://cachua.cf"
                })
            }

        }
        return Response.success(book)      
    }
    return null;
}