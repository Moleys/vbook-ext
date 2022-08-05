function execute() {
    let response = fetch("https://m.aixdzs.com/sort/all");
    if (response.ok) {
        let doc = response.html();
        let menu = doc.select("ul.ix-list li")
        var nav = []
        menu.forEach(e => {
            let input =  "https://m.aixdzs.com" + e.select('a').attr("href")
            nav.push({ 
                title: e.select("a").text() + " (" + e.select("em.smallblue").text() +")", 
                input: input, 
                script: "gen.js" 
                })
        })
        return Response.success(nav)
    }

    return null;
}