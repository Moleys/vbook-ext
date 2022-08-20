function execute() {
    var nav = []
    nav.push({ 
        title: "最新更新小说",
        input: "home", 
        script: "gen.js" 
    })

    let response = fetch("https://www.aduosw.com/rank.html");
    if (response.ok) {
        let doc = response.html();
        let menu_name = doc.select(".container ul.topindex h3")
        let menu = doc.select(".container ul.topindex .footer.tar a")
        for (let i = 0;i < menu.size(); i++) {
            var e = menu.get(i);
            let input = "https://www.aduosw.com" + e.select('a').attr("href").replace(".html","");
            nav.push({ 
                title: menu_name.get(i).text(), 
                input: input, 
                script: "zen.js" 
            })
        }
        return Response.success(nav)
    }
    return null;
}