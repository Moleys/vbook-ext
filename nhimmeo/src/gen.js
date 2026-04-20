load('config.js');

function execute(url, page) {
    if (!page) page = '1';
    let url1 = "https://backup.nhimmeo.cf/api/categories.php?q="+url+"&page=" + page;
    console.log(url1)
    let response = fetch(url1);
    if (response.ok) {
            let doc = response.json();
            let data = [];
            let books = doc.data.books
            for (let i = 0;i < books.length; i++) {
                var e = books[i];
                data.push({
                    name: e.book_name,
                    link: BASE_URL + "/book/"+e.book_id,
                    cover:  e.cover,
                    description: e.author_name,
                    host: BASE_URL
                });
            }

        var next  =  parseInt(page)+1
        return Response.success(data, next.toString())
    }
    return null;
}