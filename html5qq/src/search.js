
function execute(key, page) {
    var response = fetch("https://so.html5.qq.com/ajax/real/search_result?tabId=360&noTab=1&q=" + encodeURIComponent(key));
    if (response.ok) {
        var json = response.json();
        var book_list = json.data.state || [];
		var data = [];

		book_list.forEach(function(e) {

            if(e.items && e.items.length > 0)
            {

                var e1 = e.items[0]
                var bookId = extractBookId(e1.jump_url);
                if (!bookId) return;
                    data.push({
                        name: e1.title,
                        link: "https://bookshelf.html5.qq.com/autojump/intro?bookid=" + bookId,
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

function extractBookId(url1) {
    return (String(url1 || "").match(/[?&]book(?:id|Id)=(\d+)/) || [])[1];
}
