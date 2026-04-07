load('config.js');
function execute(url, page) {
    let response = fetch(config_host + "/getBookshelf")
    if (response.ok) {
        let doc = response.json();
        let item_list = doc.data
        const data = [];
        item_list.forEach((e, index) => {
            let isComic = (e.type & 64) !== 0;
            let type_book = isComic ? "&type=comic" : "";
            let book_url = encodeURIComponent(e.bookUrl)

            data.push({
                name: e.name,
                link: config_host + "/getChapterList?url=" + book_url + type_book,
                bookUrl: book_url,
                cover: config_host + "/cover?path=" + e.coverUrl,
                description: e.author,
                host: config_host
            })
        });
        return Response.success(data)
    }
    return Response.error("Bật web service ở app Legado, tắt DNS over HTTPS, chi tiết xem Hướng dẫn Legado ở THẢO LUẬN. \n (không phải thêm mã bổ sung nữa, có thể xoá luôn đi)");
}