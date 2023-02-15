function execute(url, page) {
    if (!page) page = '1';
    let response = fetch("https://api.comick.app/chapter?page=" +page+ "&order="+url);
    if (response.ok) {
        let doc = response.json()
        const data = [];
        doc.forEach(e => {
            let coverImg = "https://meo.comick.pictures/" + e.md_comics.md_covers[0].b2key +"?width=244";
            data.push({
                name: e.md_comics.title,
                link: "https://comick.app/comic/" + e.md_comics.slug,
                cover: coverImg,
                description: "",
                host: "https://comick.app"
            })           
        });
        let next = parseInt(page,10) + 1
        return Response.success(data, next);
    }
}


