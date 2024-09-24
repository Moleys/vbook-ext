load('config.js');

function execute(key, page) {
    if(!page) page =1
	let response = fetch(`https://novel.snssdk.com/api/novel/channel/homepage/search/search/v1/?device_platform=android&parent_enterfrom=novel_channel_search.tab.&offset=${(page-1)*10}&aid=1967&q=${key}`)
	if (response.ok) {
		let doc = response.json();
		let item_list = doc.data.ret_data
		const data = [];
		item_list.forEach((el, index) => {
            if(el.title)
            {
                let e = el
                data.push({
                    name: e.title,
                    link: config_host + "/page/" + e.book_id,
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