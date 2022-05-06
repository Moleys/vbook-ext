function execute(url) {
	url = url.replace('m.ebook8.com', 'www.ebook8.com');
    if(url.slice(-1) !== "/")
        url = url + "/";

    let response = fetch(url+"catalog/");
    if (response.ok) {
        let doc = response.html();
        let total = doc.select("#end").last().attr("href").replace(".html","").split(/[/ ]+/).pop();
        const data = [];

         for (let i = 1;i <= total; i++) {
            let responseToc = fetch(url+"catalog/"+ i +".html");
            if (responseToc.ok) {
                let doctoc = responseToc.html();
                let el = doctoc.select("ol.BCsectionTwo-top li");
                for (let i = 0;i < el.size(); i++) {
                    var e = el.get(i);
                    data.push({
                        name: e.select("a.g").text(),
                        url:"http://www.ebook8.com" + e.select("a.g").attr("href"),
                        host: "http://www.ebook8.com"
                    })
                }
            }
        }
        return Response.success(data);
    }
    return null;
}