function execute(input, page) {
    if (!page) page = 0
    const url = "https://www.pixiv.net/ajax/novels/comments/roots?novel_id="+input+"&offset=0&limit=50&lang=en";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.json();
        let comm = doc.body.comments;
        
        let comments = [];
        comm.forEach(e => {
            let last_publish_time_string = (e.commentDate)
            comments.push({
                name: e.userName,
                content: e.comment.replace(/\n/g,"<br>"),
                description: last_publish_time_string
            });
        });

        let next = parseInt(page, 10) + 1

        return Response.success(comments, next);
    }

    return null;
}