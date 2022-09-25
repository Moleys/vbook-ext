function execute(url,page) {

    if(!page) page="1";

    var doc = Http.get(url +"?"+ page).html();

    var next =  doc.select("#list-chapter .pagination .next a").attr("href").match(/page=(\d+)/);
    if (next) next = next[1];
    if (doc) {
        var list = [];
        var el = doc.select("#list-chapter .row .col-xs-12 ul li a");
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            list.push({
                name: e.attr("title"),
                url: e.attr("href"),
                host: "https://novelfull.com"
            });
        }
        return Response.success(list,next);
    }
    return null;
}