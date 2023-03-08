function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    let bookid = url.split(/[/ ]+/).pop()
    let newurl = "https://api3-normal-lf.fqnovel.com/reading/bookapi/directory/all_items/v/?need_version=true&book_id=" +bookid + "&iid=2159861899465991&aid=1967&app_name=novelapp&version_code=311"
	let response = fetch(newurl, {
        headers: {
            'user-agent': UserAgent.android()
        }
    });
    if (response.ok) {
        let res_json = response.json();
        let array = res_json.data.item_list;
        // 2048 characters
        let chunkSize = 80
        let allBook = []

        for (let i = 0; i < array.length; i += chunkSize) {
            let chunk = array.slice(i, i + chunkSize).join(",");
            console.log(chunk)
            allBook.push(chunk);
        }
        return Response.success(allBook);  


    }
    return null;
}