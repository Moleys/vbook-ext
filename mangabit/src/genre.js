function execute() {
    let response = fetch("https://mangabit.top/the-loai/52/viet-nam");
    if (response.ok) {
        let doc = response.html();
        let menu = doc.select(".mgb-plugin-genre-box a")
        var nav = []
        menu.forEach(e => {
            let input = "https://mangabit.top" + e.select('a').attr("href");
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