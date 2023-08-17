
function execute(key, page) {
    if (!page) page = '1';
    let url = "https://sv2.nhimmeo.ovh/api/search.php?q=" + key +"&page=" + page
    let response = fetch(url)
    if (response.ok) {
        const data = [];
		let text_encrypt = response.json();
        let json_decrypt = text_encrypt.data;
        let book_list = json_decrypt.book_list
        book_list.forEach(e => {
            data.push({
                name: e.book_name,
                link: "https://sv2.nhimmeo.ovh/book/" + e.book_id,
                cover:  e.cover,
                description: e.author_name,
                host: "https://sv2.nhimmeo.ovh"
            });
        });
        var next = parseInt(page, 10) + 1;
        return Response.success(data, next)
    }
    return null;
}
