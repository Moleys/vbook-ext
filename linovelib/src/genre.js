function execute() {

    let response = fetch("https://w.linovelib.com/tagarticle/JK/1.html");
    if (response.ok) {
        let doc = response.html();
        let menu = doc.select(".sort-li-detail a.btn-tag")
        var nav = []
        menu.forEach(e => {
            let input = "https://w.linovelib.com" + e.select('a').attr("href").replace("/1.html","")
            nav.push({ 
                title: e.text(), 
                input: input, 
                script: "gen2.js" 
                })
            
        })
        return Response.success(nav)
    }

    return null;
}