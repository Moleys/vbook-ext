function execute(url) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {
        const data = [];
        let doc = response.html();
        let elr1 = doc.select('select[name="pageselect"]').first().select("option");
        elr1.forEach((element) => {
            let url1 = url + element.attr("value");
            data.push(url1)
        })
        if(data.length === 0){
            data.push(url)
        }
        return Response.success(data);
    }
    return null;
}