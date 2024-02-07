
load('config.js');

function execute(url, page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (!page) page = '1';
    let url = BASE_URL+"/api/search.php?q=" + key +"&page=" + page
    let response = fetch(url)
    if (response.ok) {
        const data = [];
		let text_encrypt = response.json();
        let json_decrypt = text_encrypt.data;
        let book_list = json_decrypt.book_list
        book_list.forEach(e => {
            data.push({
                name: e.book_name,
                link: BASE_URL+"/book/" + e.book_id,
                cover:  e.cover,
                description: e.author_name,
                host: BASE_URL
            });
        });
        var next = parseInt(page, 10) + 1;
        return Response.success(data, next)
    }
    return null;
}
