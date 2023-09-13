function execute(url) {
	url = url.replace('m.shenyekanshu.com', 'www.shenyekanshu.com');
    if(url.slice(-1) !== "/")
        url = url + "/";

    let response = fetch(url+"catalog/");
    if (response.ok) {
        let doc = response.html();
        let total = doc.select("#end").last().attr("href").replace(".html","").split(/[/ ]+/).pop();
        const data = [];

         for (let i = 1;i <= total; i++) {
                data.push(url+"catalog/"+ i +".html")
        }
        return Response.success(data);
    }
    return null;
}