function execute(url) {
	url = url.replace('m.wdbqg.com', 'www.wdbqg.com');


    let response = fetch(url);
    if (response.ok) {
        const data = [];
        let doc = response.html();
        let elr1 = doc.select('select[name="pageselect"]').first().select("option");
        elr1.forEach((element) => {
            let url1 = "https://www.wdbqg.com" + element.attr("value");
            data.push(url1)
        })
        if(data.length === 0){
            data.push(url)
        }

        return Response.success(data);
    }
    return null;
}