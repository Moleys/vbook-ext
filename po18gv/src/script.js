function execute() {
    let response = fetch("https://www.po18gv.vip/top/");
    if (response.ok) {
        let doc = response.html('gbk');
        let menu = doc.select('.container.body-content .panel-heading')
        var nav = []
        menu.forEach(e => {
            nav.push({ 
                title: e.text().replace("More+","").split(".")[1], 
                input: "https://www.po18gv.vip" + e.select("a").attr("href"), 
                script: "gen.js" 
            })
        })
        return Response.success(nav)
    }
    return null;
}