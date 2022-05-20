function execute(url, page) {
    if(!page) page = '1';
    let response = fetch(url + "-page-"+ page +".html");
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
		let ele1 = doc.select("#threadlist tr");
        let next = doc.select('div.pages').first().select("b + a").text();
        ele1.forEach(e => {
            let cate = e.select("tr.tr3 td.subject a.f12").first().text();
            if(cate.includes("]") && cate.includes("[")) {
                
                data.push({
                    name: e.select("td.subject a.subject_t.f12").first().text().split("》")[0].replace("《",""),
                    link: "https://www.liudabook.com/" + e.select("td.subject a.subject_t.f12").first().attr("href"),
                    description: cate.replace("]","").replace("[",""),
                    host: "https://www.liudabook.com"
                });
            }
        });


        return Response.success(data, next.toString());
    }
    return null;
}