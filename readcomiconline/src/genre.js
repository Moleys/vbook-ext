function execute() {

    let response = fetch("https://readcomiconline.li/ComicList");
    if (response.ok) {
        let doc = response.html();
        let menu = doc.select("#rightside .rightBox .barContent a[href*=Genre]")
        var nav = []
        menu.forEach(e => {
            let input = "https://readcomiconline.li" + e.select('a').attr("href")
            nav.push({ 
                title: e.text(), 
                input: input, 
                script: "gen.js" 
                })
        })
        return Response.success(nav)
    }

    return null;
}