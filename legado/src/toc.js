
function execute(url) {
    let response_chapter_list = fetch(url)
    if (response_chapter_list.ok) {
        let json = response_chapter_list.json();
        let chapter_list = json.data;
        const data = [];
        chapter_list.forEach((e) => {
            data.push({
                name: e.title,
                url: host + "/getBookContent?url="+e.bookUrl+"&index=" + e.index,
                host: host
            })
        });
        return Response.success(data)
    }
    return null;
}

