load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const regex = /const\s+CHAPTER_ID\s*=\s*(\d+);/;
        const book_id = doc.html().match(regex)[1];
        let url2 = "https://nettruyenloli.com/ajax/image/list/chap/" + book_id
        let response2 = fetch(url2);
        if (response2.ok) {
            let doc2 = response2.json().html
            console.log(doc2)
            let doc3 = Html.parse(doc2) 
            let data = [];
            doc3.select(".page-chapter img").forEach(e => {
                let img = e.attr("data-original");
                data.push(img)

            });
            return Response.success(data);
        }
    }
    return null;
}