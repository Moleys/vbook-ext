load('config.js');
function execute(url) {
	let book_id = url.split("book_id=")[1]
	let response = fetch(config_host + "/catalog?book_id=" + book_id)
    if (response.ok) {
        let json = response.json();
        let chapter_list = json.data.data.item_data_list;
        const data = [];
        chapter_list.forEach((e) => {
            data.push({
                name: e.title,
                url: config_host + "/content?item_id=" + e.item_id
            })
        });
        return Response.success(data)
    }
    return null;
}
        
