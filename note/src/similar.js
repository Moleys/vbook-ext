load('config.js');

// Bài viết khác của cùng tác giả (tab "同じ著者の記事" trong trang chi tiết).
function execute(input) {
    let urlname = urlnameOf(input) || String(input || "").trim();
    if (urlname === "") return Response.error("note.com: không xác định được tác giả");

    let api = apiGet("/api/v2/creators/" + encodeURIComponent(urlname) + "/contents?kind=note&page=1&per=20");
    let failure = apiError("note.com", api);
    if (failure) return failure;
    let body = api.data && api.data.data ? api.data.data : null;
    if (!body) return Response.error("note.com: không có dữ liệu tác giả");

    let contents = body.contents || [];
    let items = [];
    for (let i = 0; i < contents.length; i++) {
        let item = noteItem(contents[i]);
        if (item && item.name !== "") items.push(item);
    }
    return Response.success(items, "");
}
