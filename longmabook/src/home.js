function execute() {

    let response = fetch("https://ebook.longmabook.com/?act=rankingall&ranktype=ranking-v-day");
    if (response.ok) {
        let doc = response.html();
        let menu = doc.select("select.uk-select option")
        var nav = []
        menu.forEach(e => {
            let link = e.select('option').attr("value");
            if(link.includes("/?act=rankingall")===true){
                let input = "https://ebook.longmabook.com" + link
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