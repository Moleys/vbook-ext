function execute(url, page) {
	// let host = 'http://192.168.0.104:1122'

	if (typeof host === "undefined") {
		return Response.error("Bật web service ở app Legado, thêm mã bổ sung: [let host = 'http://192.168.0.168:1122'] (sửa url lại cho đúng, không có dấu [] ), tắt DNS over HTTPS, chi tiết xem Hướng dẫn Legado ở THẢO LUẬN.");

	} else {
		let response = fetch(host + "/getBookshelf")
		if (response.ok) {
			let doc = response.json();
			let item_list = doc.data
			const data = [];
			item_list.forEach((e, index) => {
                let type_book = (e.originName.includes("🎨") || e.originName.includes("✐")) ? "&type=comic" : "";
				data.push({
					name: e.name,
					link: host + "/getChapterList?url=" + e.bookUrl + type_book,
                    bookUrl: e.bookUrl,
					cover: host + "/cover?path=" + e.coverUrl,
					description: e.author,
					host: host
				})
			});
			return Response.success(data)
		}
		return null;
	}

}