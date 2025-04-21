function execute() {

    let response = fetch(BASE_URL+"/tagarticle/JK/1.html");
    if (response.ok) {
        let doc = response.html();
        let menu = doc.select(".sort-li-detail a.btn-tag")
        var nav = []
        menu.forEach(e => {
            let input = BASE_URL + e.select('a').attr("href").replace("/1.html","")
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