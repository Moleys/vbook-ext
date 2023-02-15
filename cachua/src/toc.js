function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    let bookid = url.split(/[/ ]+/).pop()
    let newurl = "https://api3-normal-lf.fqnovel.com/reading/bookapi/directory/all_items/v/?book_id=" + bookid + "&need_version=true&&iid=2665637677906061&aid=1967&app_name=novelapp&version_code=495";
	let response = fetch(newurl, {
        headers: {
            'user-agent': UserAgent.android()
        }
    });
    if (response.ok) {
        let res_json = response.json();
        let allBook = res_json.data.item_data_list;
        const book = [];
        for (let i = 0; i < allBook.length; i++) {
            let item = allBook[i];
            book.push({
                name: item['title'],           
                url: "https://cachua.cf/chap/"+item['item_id'],
                host: "https://cachua.cf"
            })
        }
        return Response.success(book);  
    }
    return null;
}