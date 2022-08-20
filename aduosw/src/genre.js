function execute() {
    let response = fetch("https://www.aduosw.com/category.html");
    if (response.ok) {
        let doc = response.html();
        let menu_name = doc.select(".container ul.topindex h3")
        let menu = doc.select(".container ul.topindex .footer.tar a")
        var nav = []
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