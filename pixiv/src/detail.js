function execute(url) {
    let book_id = url.split("id=")[1]
    console.log(book_id)

    let response = fetch("https://www.pixiv.net/ajax/novel/"+book_id);
    if (response.ok) {
        let doc = response.json()
        let obj = doc.body

        let genres = [];

        obj.tags.tags.forEach(e => {
            if(e.tag)
            genres.push({
                title: e.tag,
                input: encodeURIComponent(e.tag),
                script: "gen2.js"
            });
        });
        let suggests = [];

        try {
            let novel_name = obj.seriesNavData.title;
            let novel_id = obj.seriesNavData.seriesId;
            console.log(JSON.stringify(novel_id));

            suggests = [
                {
                    title: novel_name,
                    input: novel_id,
                    script: "suggest.js"
                }
            ];
        } catch {
            suggests = [];
        }

        return Response.success({
            name: obj.title,
            cover: obj.coverUrl,
            author: obj.userName,
            description: obj.createDate +"<br/>"+"Like: " + obj.likeCount +"<br/>" +"View: " + obj.viewCount +"<br/>"  +obj.description,
            comment: {
                input: book_id,
                script: "comment.js"
            },
            suggests: suggests,

            genres: genres,

            detail: "作者： " + obj.userName,
            host: "https://www.pixiv.net"
        });
    }
    return null;
}