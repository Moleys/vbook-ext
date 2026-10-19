load('config.js');

// Works mới đăng theo thời gian tạo (order=create_date), subtitle=0.
// URL: /api/works?order=create_date&sort=desc&page=N&pageSize=20&subtitle=0
function execute(query, page) {
    page = page || "1";
    var json = fetchWorksList("create_date", page, "0");
    if (!json) return Response.error("HTTP lỗi");
    return Response.success(parseWorks(json), nextPageToken(json, page));
}
