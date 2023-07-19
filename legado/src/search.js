load('config.js');
function execute(key, page) {
	// let config_host = "http://192.168.0.102:1122"
	let response = fetch(config_host + "/getBookshelf")
	if (response.ok) {
		let doc = response.json();
		let item_list = doc.data
		const data = [];
		item_list.forEach((e, index) => {
			let name = e.name
			if (name.includes(key))
				data.push({
					name: name,
					link: config_host + "/getChapterList?url=" + e.bookUrl,
					cover: e.coverUrl,
					description: e.author,
					host: config_host
				})
		});
		return Response.success(data)
	}
	return null;
}