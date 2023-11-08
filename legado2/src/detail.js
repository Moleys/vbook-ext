load('config.js');
function execute(url) {
	// let config_host = 'http://192.168.0.102:1122'
	let book_url = decodeURIComponent(url.split("/getChapterList?url=")[1].split("&type=")[0])

	if (typeof config_host === "undefined")
		return Response.error(book_url);
	else {
		let response = fetch(config_host + "/getBookshelf")
		if (response.ok) {
			try {
				let json = response.json();
				let book_list = json.data;
				let book_info = book_list.find(obj => obj.bookUrl.includes(book_url));
				console.log(JSON.stringify(book_info))
				let type_book = (url.includes("&type=comic")) ? "comic" : "novel";
				return Response.success({
					name: book_info.name || "Lorem ipsum",
					cover: config_host + "/cover?path="+ book_info.coverUrl,
					author: book_info.author || "Unknown",
					description: (book_info.intro || "").replace(/\r\n/g, "<br>"),
					detail: !book_info.author ? "" :"作者：" + book_info.author + "<br>" + (book_info.kind || ""),
					host: config_host,
					type: type_book
				});
			} catch (error) {
				return Response.error(error);
			}
		}
		return null;
	}
}