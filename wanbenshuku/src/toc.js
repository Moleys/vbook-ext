function execute(url) {
	url = url.replace('m.wanbenshuku.com', 'www.wanbenshuku.com');
    url = url.replace("book","xiaoshuo").replace(".html","/")
    let response1 = fetch(url);
    const data = [];
    if (response1.ok) {
        let doc1 = response1.html();
        let elr1 = doc1.select("#indexselect").first().select("option");
        elr1.forEach((element) => {
            let url1 = "https://www.wanbenshuku.com" + element.attr("value");

            let response2 = fetch(url1);
            if (response2.ok) {
                let doc = response2.html();
                let el1 = doc.select("#content_1").last().select("a");
                for (let i = 0;i < el1.size(); i++) {
                    var e = el1.get(i);
                    data.push({
                        name: e.select("a").text(),
                        url:"http://www.wanbenshuku.com" + e.attr("href"),
                        host: "http://www.wanbenshuku.com"
                    })
                }
            }



        })


        return Response.success(data);
    }
    return null;
}