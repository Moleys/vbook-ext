
function execute(url ) {
    let book_id = url.split(/[/ ]+/).pop();

    let response = fetch(url);

    if (response.ok) {
        let doc = response.json();
        let el = doc.data.chapters;
        const data = [];
        for (let i = 0; i < el.length; i++) {
            let e = el[i];
            data.push({
                name: e.chapter_name,
                url: "https://api.tainettruyen.com/api/comic/"+book_id+"/" + e.chapter_id,
                host: "https://api.tainettruyen.com"
            })
        }
        data = data.reverse();
        return Response.success(data);
    }

    return null;
}