

function execute(key, page) {
    if (!page) page = '1';
    let response = fetch("https://api.tainettruyen.com/api/search?catId=1&statusId=1&typeId=1&keyword="+key+"&page="+page+"&limit=10&v=12&non_user=1");
    if (response.ok) {
        let doc = response.json();
        let data = [];
        doc.data.data.forEach(e => {
            let coverImg = e.comic_image
            let link = "https://api.tainettruyen.com/api/comic/" + e.comic_id
            data.push({
                name: e.comic_name,
                link: link,
                cover: coverImg,
                description: "View: " + e.comic_view,
                host: "https://api.tainettruyen.com"
            });
        });

        let next = parseInt(page, 10) + 1
        return Response.success(data, next.toString());
    }

    return null;
}


