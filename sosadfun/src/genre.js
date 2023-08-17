load('config.js');

function execute() {

    let response = fetch(BASE_URL+"/category/");
    if (response.ok) {
        let doc = response.html();
        let menu = doc.select(".CGsectionTwo-left a")
        var nav = []
        menu.forEach(e => {
            let c = e.select('a').attr("href");
            if(e.select('a').attr("href").includes("category/0/")==false){
                let input = BASE_URL + e.select('a').attr("href")
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