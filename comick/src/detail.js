function execute(url) {
    let url_api =  "https://api.comick.app/comic/" + url.split(/[/ ]+/).pop()
    // https://api.comick.app/comic/solo-leveling/
    let response = fetch(url_api);
    if (response.ok) {
        let doc = response.json();
        let coverImg = doc.comic.md_covers[0].b2key;
        coverImg = "https://meo.comick.pictures/" + coverImg +"?width=480";
        let authors = doc.authors.map(author => author.name).join('; ');
        return Response.success({
            name: doc.comic.title,
            cover: coverImg,
            author: authors,
            description: doc.comic.desc.replace(/\n/g,"<br>"),
            detail: "Author： " + authors ,
            host: "https://comick.app"
        });
    }
    return null;
}