load('config.js');
function execute(url) {
    const regex = /(?:book_id=|\/)(\d+)$/;
    let book_id = url.match(regex)[1]
	let response = fetch(config_host2 + "/catalog?book_id=" + book_id)
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
        
