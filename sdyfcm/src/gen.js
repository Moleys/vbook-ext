function execute(url, page) {
	url = url.replace('m.sdyfcm.com', 'www.sdyfcm.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];


        if(url.indexOf("/sort") === -1){
            let ele1 = doc.select("tbody").last();
            ele1.select("tr").forEach(e => {
                data.push({
                    name: e.select(".name_dba a").first().text(),
                    link: e.select(".name_dba a").first().attr("href"),
                    description: e.select(".hidden-xs a").first().text(),
                    host: "http://www.sdyfcm.com"
                })
            });
        }
        else{

            let ele1  =  doc.select("table.table").last();
            ele1.select("tr").first().remove(); //th
            ele1.select("tr").forEach(e => {
                data.push({
                    name: e.select("a").first().text(),
                    link: e.select("a").first().attr("href"),
                    description: e.select(".hidden-xs a").first().text(),
                    host: "http://www.sdyfcm.com"
                })
            });
        }
		
		

        return Response.success(data)
    }
    return null;
}