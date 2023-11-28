load('config.js');

function execute(url) {
    let newurl = `https://novel.snssdk.com/api/novel/book/directory/detail/v1/?aid=1967&item_ids=${url}`
    console.log(newurl)
    
	let response = fetch(newurl, {
        headers: {
            'user-agent': UserAgent.android()
        }
    });
    if (response.ok) {
        let res_json = response.json();
        let item = res_json.data;
        const book = [];
        for (let i = 0; i < item.length; i ++) {
            book.push({
                name: item[i].title,           
                url: config_host + "/reader/" + item[i].item_id,
                host: config_host
            })
        }
        return Response.success(book);  
    }
    return null;
}