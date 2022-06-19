
function execute(key, page) {

    var response = fetch("http://www.paoshu8.com/modules/article/search.php?searchkey=" +key);
    if (response.ok) {
        var doc = response.html();
        
		var data = [];
		doc.select("table.grid tr#nr").forEach(e => {
            console.log(e)
            data.push({
                name: e.select("td.odd").first().text(),
                link: e.select("a").first().attr("href"),
                description: e.select("td.odd").get(1).text(),
                host: "http://www.665txt.com"
            })
        });
        return Response.success(data);
    }
    return null;
}