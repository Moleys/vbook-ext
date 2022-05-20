function execute(url, page) {
    if(!page) page = '1';
    let response = fetch(url + "-" + page);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
		let ele1 = doc.select("#threadlist tr");
        let next = doc.select('.pages_next').first().attr("href").split("-")[1];
        ele1.forEach(e => {
            let cate = e.select("td.subject a.mr5.s4.view.f12").first().text().replace("]","").replace("[","");
            if(cate !== null && cate !== '') {
                data.push({
                    name: e.select("td.subject a.subject_t.f12").first().text().split("》")[0].replace("《",""),
                    link: "https://bbs.fanfanc.com/" + e.select("td.subject a.subject_t.f12").first().attr("href"),
                    description: cate,
                    host: "http://bbs.fanfanc.com"
                });
            }
        });


        return Response.success(data, next.toString());
    }
    return null;
}