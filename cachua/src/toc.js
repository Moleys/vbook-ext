function execute(url) {
    let newurl = `https://api5-normal-lf.fqnovel.com/reading/bookapi/directory/all_infos/v/?item_ids=${url}&iid=2159861899465991&aid=1967&version_code=311&update_version_code=31132`
	let response = fetch(newurl, {
        headers: {
            'user-agent': UserAgent.android()
        }
    });
    if (response.ok) {
        let res_json = response.json();
        console.log(res_json)
        let item = res_json.data[0];
        const book = [];

        book.push({
            name: item['title'],           
            url: "https://cachua.cf/chap/"+item['item_id'],
            host: "https://cachua.cf"
        })
        
        return Response.success(book);  
    }
    return null;
}