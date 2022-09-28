function execute(url) {
    url = url.replace("xsbiquge.net/","xsbiquge.net/indexlist/");
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let elr1 = doc.select("#indexselect").first().select("option");
        elr1.forEach(e => {
            data.push("https://www.xsbiquge.net" + e.attr("value"));
        });
        
        return Response.success(data);
    }
    return null;
}