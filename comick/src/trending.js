function execute(url) {
    let response = fetch("https://api.comick.fun/top");
    if (response.ok) {
        let doc = response.json()
        const data = [];
        doc.trending[url].forEach(e => {
            let coverImg = "https://meo.comick.pictures/" + e.md_covers[0].b2key +"?width=244";
            data.push({
                name: e.title,
                link: "https://comick.app/comic/" + e.slug,
                cover: coverImg,
                description: "",
                host: "https://comick.app"
            })           
        });
        return Response.success(data);
    }
}


