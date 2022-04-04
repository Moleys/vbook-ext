function execute(url) {
	url = url.replace('m.jx.la', 'www.jx.la');
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response1 = fetch(url);
    const data = [];
    if (response1.ok) {
        let doc1 = response1.html();
        let elr1 = doc1.select('select[name="pageselect"]').first().select("option");
        console.log(elr1)
        elr1.forEach((element) => {
            let url1 = "https://www.jx.la" + element.attr("value");

            let response2 = fetch(url1);
            if (response2.ok) {
                let doc = response2.html();
                let el1 = doc.select("ul.list").last().select("li a");
                for (let i = 0;i < el1.size(); i++) {
                    var e = el1.get(i);
                    data.push({
                        name: e.select("a").text(),
                        url: e.attr("href"),
                        host: "https://www.jx.la"
                    })
                }
            }



        })


        return Response.success(data);
    }
    return null;
}