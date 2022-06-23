function execute(url) {
	url = url.replace('m.56bok.com', 'www.56bok.com');
    let url0 = url.split(/[/ ]+/).pop();
    url0 = url.replace(url0,"")
    let response = fetch(url);
    if (response.ok) {
        const data = [];
        let doc = response.html('gbk');
        let elr1 = doc.select('select[name="pageselect"]').first().select("option");
        elr1.forEach((element) => {
            let url1 = url0 + element.attr("value");
            data.push(url1)
        })
        if(data.length === 0){
            data.push(url)
        }

        return Response.success(data);
    }
    return null;
}