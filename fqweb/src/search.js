load('config.js');
function execute(key, page) {
    if(!page) page =1
	let response = fetch(config_host2 + "/search?query="+key+"&page="+page)
	if (response.ok) {
		let doc = response.json();
		let item_list = doc.data.search_tabs[0].data
		const data = [];
		item_list.forEach((el, index) => {
            if(el.book_data)
            {
                let e = el.book_data[0]
                data.push({
                    name: e.book_name,
                    link: config_host + "/info?book_id=" + e.book_id,
                    cover: e.thumb_url,
                    description: e.author,
                    host: config_host
                })
            }
		});
        let next = parseInt(page,10) +1
        return Response.success(data, next.toString());
	}
	return null;
}