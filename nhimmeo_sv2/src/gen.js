function execute(url, page) {
    if (!page) page = '1';
    let url1 = "https://mip.ciweimao.com/index/book_list_data?keyword=&category_type=" + url + "&pn=" + page;
    let response = fetch(url1);
    if (response.ok) {
            let json = response.text();
            if(json.startsWith('(') === true)
                json = json.slice(1)
            if(json.slice(-1) === ")")
                json = json.slice(0, -1)
            json = JSON.parse(json).data;
            let data = [];
            let books = json.items;
            books.forEach(e => {
                data.push({
                    name: e.book_name,
                    link: "https://sv2.nhimmeo.cf/book/" + e.book_id,
                    cover:  e.cover,
                    description: e.author_name,
                    host: "https://sv2.nhimmeo.cf"
                });
            });

        var next  =  parseInt(page, 10) + 1;
        return Response.success(data, next.toString())
    }
    return null;
}