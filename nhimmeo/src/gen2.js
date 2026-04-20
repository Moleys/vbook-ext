load('config.js');

function execute(url, page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (!page) page = '1';
    let url1 = "https://backup.nhimmeo.cf/api/userchap.php?page=" + page;
    let response = fetch(url1);
    if (response.ok) {
            let doc = response.json().data.books;
            let data = [];
            for (let i = 0;i < doc.length; i++) {
                var e = doc[i];
                data.push({
                    name: e.bookName,
                    link: BASE_URL + "/book/"+e.book_id,
                    cover:  e.cover,
                    description: e.authorName,
                    host: BASE_URL
                });
            }

        var next  =  parseInt(page)+1
        return Response.success(data, next.toString())
    }
    return null;
}