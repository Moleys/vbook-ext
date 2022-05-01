
function execute(key, page) {
    var gbkEncode = function(s) {
        load('gbk.js');
        return GBK.encode(s);
    }
    var response = fetch("http://www.665txt.com/modules/article/search.php?searchtype=articlename&searchkey=" +gbkEncode(key));
    if (response.ok) {
        var doc = response.html('gbk');
        
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