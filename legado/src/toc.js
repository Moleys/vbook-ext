function execute(url) {
	// let host = 'http://192.168.0.104:1122'
	let book_url = encodeURIComponent(url.split("/getChapterList?url=")[1].split("&type=")[0])
    console.log(host + "/getChapterList?url=" + book_url)
	let response_chapter_list = fetch(host + "/getChapterList?url=" + book_url)
	if (response_chapter_list.ok) {
		let json = response_chapter_list.json();
		let chapter_list = json.data;
		const data = [];
        let type_book = (url.includes("&type=comic")) ? "&type=comic" : "";
		chapter_list.forEach((e) => {
			data.push({
				name: e.title,
				url: host + "/getBookContent?url=" + encodeURIComponent(e.bookUrl) + "&index=" + e.index + type_book,
				host: host
			})
		});
		return Response.success(data)
	}
	return null;
}