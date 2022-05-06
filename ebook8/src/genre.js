function execute() {

    let response = fetch("https://www.ebook8.com/category/");
    if (response.ok) {
        let doc = response.html();
        let menu = doc.select("div.CGsectionTwo-left p a")
        var nav = []
        menu.forEach(e => {
            Console.log(e.select('a').attr("href"))
            let input = "https://www.ebook8.com/" + e.select('a').attr("href")
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