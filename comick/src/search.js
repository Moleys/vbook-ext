function execute(key, page) {
    if (!page) page = '1';
    let url_api = "https://api.comick.app/v1.0/search?q="+key+"&limit=30&page=" + page;
    let response = fetch(url_api);
    if (response.ok) {
        let doc = response.json()
        const data = [];
        doc.forEach(e => {
            let coverImg = "https://meo.comick.pictures/" + e.md_covers[0].b2key +"?width=144";
            data.push({
                name: e.title,
                link: "https://comick.app/comic/" + e.slug,
                cover: coverImg,
                description: "",
                host: "https://comick.app"
            })           
        });
        let next = parseInt(page,10) + 1
        return Response.success(data, next);
    }
}


