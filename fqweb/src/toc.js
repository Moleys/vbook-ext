function execute(url) {
	// let host = 'https://workout-assign-nation-remains.trycloudflare.com'
	let book_id = url.split("book_id=")[1]
	let response = fetch(host + "/catalog?book_id=" + book_id)
    if (response.ok) {
        let json = response.json();
        let chapter_list = json.data.data.item_data_list;
        const data = [];
        chapter_list.forEach((e) => {
            data.push({
                name: e.title,
                url: host + "/content?item_id=" + e.item_id,
                host: host
            })
        });
        return Response.success(data)
    }
    return null;
}
        
