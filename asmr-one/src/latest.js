load('config.js');

// Works mới nhất theo ngày phát hành.
function execute(query, page) {
    page = page || "1";
    var json = fetchWorksList("release", page);
    if (!json) return Response.error("HTTP lỗi");
    return Response.success(parseWorks(json), nextPageToken(json, page));
}
