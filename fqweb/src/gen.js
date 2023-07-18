function execute(url, page) {
	// let host = 'https://workout-assign-nation-remains.trycloudflare.com'
	if (typeof host === "undefined") {
		return Response.error("Bật web service ở app Fanqie xposed, thêm mã bổ sung: [let host = 'http://192.168.0.168:9999'] (sửa url lại cho đúng, không có dấu [] ), tắt DNS over HTTPS, chi tiết xem Hướng dẫn FQWeb ở THẢO LUẬN.");
	}
    else
    {
        if(!page) page =1
        url = url.replace('{{page}}', page);
		let response = fetch("https://fanqienovel.com/" + url)
		if (response.ok) {
			let doc = response.json();
			let item_list = doc.data.book_list
			const data = [];
			item_list.forEach((e, index) => {    
                if(e.bookName)            
                    data.push({
                        name: e.bookName,
                        link: host + "/info?book_id=" + e.bookId,
                        cover: e.thumbUri,
                        description: e.author,
                        host: host
                    })
			});
            let next = parseInt(page,10) +1
            return Response.success(data, next)
        }
    }
    return null;
}