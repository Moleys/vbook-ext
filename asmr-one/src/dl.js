load('config.js');

// Works tải nhiều nhất.
function execute(query, page) {
    page = page || "1";
    var json = fetchWorksList("dl_count", page);
    if (!json) return Response.error("HTTP lỗi");
    return Response.success(parseWorks(json), nextPageToken(json, page));
}
