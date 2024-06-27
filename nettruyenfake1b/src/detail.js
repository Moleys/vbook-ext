
function execute(url) {

    let response = fetch(url);

    if (response.ok) {
        let doc = response.json().data;
        let coverImg = doc.comic_image
        let genres = [];
        doc.comic_kind.forEach(e => {
            genres.push({
                title: e.category_name,
                input: e.category_id,
                script: "gen.js"
            });
        });



        let detail = "Nhóm dịch: " + doc.team + "<br>Chương mới nhất: " + doc.chapter_latest.chapter_name +" / " + doc.chapter_latest.updated_at
        
        return Response.success({
            name: doc.comic_name,
            cover: coverImg,
            author: doc.team,
            description: doc.comic_detail.replace(/\r?\n/g,"<br>"),
            detail: detail,
            genres: genres,
            host: "https://api.tainettruyen.com"
        });
    }

    return null;
}