function execute() {

    let response = fetch("http://www.shenyekanshu.com/category/");
    if (response.ok) {
        let doc = response.html();
        let menu = doc.select(".CGsectionTwo-left a")
        var nav = []
        menu.forEach(e => {
            let c = e.select('a').attr("href");
            if(e.select('a').attr("href").includes("category/0/")==false){
                let input = "http://www.shenyekanshu.com" + e.select('a').attr("href")
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