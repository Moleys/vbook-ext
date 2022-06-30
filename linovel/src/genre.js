function execute() {

    let response = fetch("https://www.linovel.net/cat/-1.html");
    if (response.ok) {
        let doc = response.html();
        let menu = doc.select('.box-search .search-condition').last().select("li.special a")
        menu.select("a").first().remove()
        var nav = []
        menu.forEach(e => {
            let link = e.attr("href");
            if(e.text() !== "全部"){
                let input = link.replace("/cat/","").split(".html")[0]
                nav.push({ 
                title: e.text(), 
                input: input, 
                script: "gen.js" 
                })
            }
            
        })
        return Response.success(nav)
    }

    return null;
}