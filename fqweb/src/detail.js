function execute(url) {
	// let host = 'https://workout-assign-nation-remains.trycloudflare.com'
	let book_id = url.split("book_id=")[1]
	if (typeof host === "undefined")
		return Response.error("Chưa nhập host");
	else {
		let response = fetch(host + "/info?book_id=" + book_id)
		if (response.ok) {
			try {
				let json = response.json();
				let book_info = json.data.data;
                let last_chapter_update_time = book_info.last_chapter_update_time
                let last_chapter_update_time_string = formatChineseDate(last_chapter_update_time);;
				return Response.success({
					name: book_info.book_name,
					cover: book_info.thumb_url,
					author: book_info.author,
					description: book_info.abstract.replace(/\n/g, "<br>"),
					detail: "作者：" + book_info.author +"<br>" + last_chapter_update_time_string,
					host: host,
				});
			} catch (error) {
				return Response.error(error);
			}
		}
		return null;
	}
}

function formatChineseDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}年${month}月${day}日 ${hours}时${minutes}分`;
}