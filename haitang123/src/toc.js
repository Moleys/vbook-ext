function execute(url) {
	url = url.replace('m.haitang123.co', 'www.haitang123.co');
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
                        url:"http://www.haitang123.co" + e.select("a.g").attr("href"),
                        host: "http://www.haitang123.co"
                    })
                }
            }
        }
        return Response.success(data);
    }
    return null;
}