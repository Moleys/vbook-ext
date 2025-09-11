load('config.js');
function execute(url, page) {
    // let config_host = 'http://192.168.0.102:1122'
    let response = fetch(config_host + "/getBookshelf")
    if (response.ok) {
        let doc = response.json();
        let item_list = doc.data
        const data = [];
        item_list.forEach((e, index) => {
            let type_book = (e.originName.includes("🎨") || e.originName.includes("✐")) ? "&type=comic" : "";
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
    return Response.error("Bật web service ở app Legado, tắt DNS over HTTPS, chi tiết xem Hướng dẫn Legado Minh Đức Môn ở THẢO LUẬN. ");
}