load('config.js');

// Works đánh giá cao nhất (order=rate_average_2dp).
function execute(query, page) {
    page = page || "1";
    var json = fetchWorksList("rate_average_2dp", page);
    if (!json) return Response.error("HTTP lỗi");
    return Response.success(parseWorks(json), nextPageToken(json, page));
}
