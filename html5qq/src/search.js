
function execute(key, page) {
    let response = fetch("https://so.html5.qq.com/ajax/real/search_result?tabId=360&noTab=1&q=" +key);
    if (response.ok) {
        let json = response.json();
        let book_list = json.data.state
		var data = [];
        const extractBookId = (url1) => (url1.match(/[?&]book(?:id|Id)=(\d+)/) || [])[1];

		book_list.forEach(e => {

            if(e.items && e.items.length > 0)
            {

                let e1 = e.items[0]
                    data.push({
                        name: e1.title,
                        link: "https://bookshelf.html5.qq.com/autojump/intro?bookid=" + extractBookId(e1.jump_url),
                        cover: e1.cover_url,
                        description: e1.author,
                        host: "https://novel.html5.qq.com"
                    })
            }

        });
        return Response.success(data);
    }
    return null;
}