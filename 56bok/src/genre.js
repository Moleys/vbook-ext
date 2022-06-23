function execute() {

    let response = fetch("https://www.56bok.com/class/0_1.html");
    if (response.ok) {
        let doc = response.html('gbk');
        let menu = doc.select(".content a")
        var nav = []
        menu.forEach(e => {
            let input = "https://www.56bok.com" + e.select('a').attr("href").replace("_1.html","")
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