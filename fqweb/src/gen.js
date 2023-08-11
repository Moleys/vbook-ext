load('config.js');
function execute(url, page) {
    if (!page) page = 1
    url = url.replace('{{page}}', page);
    let response = fetch("https://fanqienovel.com/" + url)
    if (response.ok) {
        let doc = response.json();
        let item_list = doc.data.book_list
        const data = [];
        item_list.forEach((e, index) => {
            if (e.bookName)
                data.push({
                    name: e.bookName,
                    link: config_host + "/info?book_id=" + e.bookId,
                    cover: e.thumbUri,
                    description: e.author,
                })
        });
        let next = parseInt(page, 10) + 1
        return Response.success(data, next)
    }
    return null;
}