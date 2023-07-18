function execute(url, page) {
	// let host = 'https://workout-assign-nation-remains.trycloudflare.com'
	if (typeof host === "undefined")
		return Response.error("Chưa nhập host");
	else {
        if(!page) page =1
        url = url.replace('{{page}}', page);
        let response = fetch(host + url);
        if (response.ok) {
            let doc = response.json();
            let rows = doc.data.data.book_info
            const data = [];
            rows.forEach(e => {
                data.push({
                    name: e.book_name,
                    link: host + "/info?book_id=" + e.book_id,
                    cover: e.thumb_url,
                    description: e.author,
                    host: host
                })
            });
            let next = parseInt(page,10) +1
            return Response.success(data, next)
        }
        return null;
    }
}