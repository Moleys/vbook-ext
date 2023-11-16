load('config.js');
function execute(url) {
	// let config_host = 'http://192.168.0.102:1122'
	let book_url = decodeURIComponent(url.split("/getChapterList?url=")[1].split("&type=")[0])
    console.log(config_host + "/getChapterList?url=" + book_url)
    let response = fetch(config_host + "/getBookshelf")
    if (response.ok) {
        let json = response.json();
        let book_list = json.data;
        let book_info = book_list.find(obj => obj.bookUrl.includes(book_url));
        let book_url2 = encodeURIComponent(book_info.bookUrl)
        let response_chapter_list = fetch(config_host + "/getChapterList?url=" + book_url2)
        if (response_chapter_list.ok) {
            let json = response_chapter_list.json();
            let chapter_list = json.data;
            const data = [];
            let type_book = (url.includes("&type=comic")) ? "&type=comic" : "";
            chapter_list.forEach((e) => {
                data.push({
                    name: e.title,
                    url: config_host + "/getBookContent?url=" + encodeURIComponent(e.bookUrl) + "&index=" + e.index + type_book,
                    host: config_host
                })
            });
            return Response.success(data)
        }
        return null;
    }

}
        
