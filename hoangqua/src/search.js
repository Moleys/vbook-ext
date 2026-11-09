load('config.js');
load('crypto.js');
// search.js — keyword search plus tab listings routed from home.js/genre.js.
// query is a keyword, or an encoded tab input: "feed", "rank:<kind>", "cate:<id>".
function execute(query, page) {
    query = query || "feed";
    page = page || "1";
    var size = "20";
    var data;
    if (query === "feed") {
        data = edgeGet("/api/videos?page=" + page + "&size=" + size);
    } else if (query.indexOf("rank:") === 0) {
        var kind = query.substring(5);
        if (kind !== "recommend" && kind !== "potential") kind = "hot";
        data = edgeGet("/api/ranks/" + kind);
        return Response.success((data.items || []).map(function (item) {
            return {
                name: item.title,
                cover: coverUrl(item.cover),
                link: videoLink(item.video_id),
                description: item.metric_label + " · " + item.cate_name,
                tag: "#" + item.rank + " · " + (item.is_finished ? "Hoàn tất" : "Đang cập nhật")
            };
        }), "");
    } else if (query.indexOf("cate:") === 0) {
        data = edgeGet("/api/videos/category/" + query.substring(5) + "?page=" + page + "&size=" + size);
    } else {
        data = edgeGet("/api/search?q=" + encodeURIComponent(query) + "&page=" + page + "&size=" + size);
    }
    return Response.success((data.items || []).map(cardItem), hasNext(data.pagination, page));
}
