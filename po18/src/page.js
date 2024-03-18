load('config.js');
function execute(url) {
    let url1 = url + "/articles"
    let response = fetch(url1);

    if (response.ok) {
        let doc = response.html();

        let num = doc.select(".page a.num").last().attr("href").split("page=")[1]

        let allBook = []
        for (let i = 1;i <= num; i++) {
            allBook.push(url+"/articles?page=" + i.toString());
        }
        if(allBook.length == 0) {
            allBook.push(url+"/articles");
        }
        return Response.success(allBook);  
    }
    return null;
}