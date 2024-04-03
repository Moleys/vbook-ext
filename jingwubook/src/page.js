function execute(url) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    url = url.replace("jingwubook.com/xs/","jingwubook.com/xsmulu/");
    
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let elr1 = doc.select("#indexselect").first().select("option");
        elr1.forEach(e => {
            data.push("https://www.jingwubook.com" + e.attr("value"));
        });
        
        return Response.success(data);
    }
    return null;
}