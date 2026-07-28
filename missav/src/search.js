load('config.js');

// Lưu ý: trang tìm kiếm của MissAV dùng Alpine.js + Recombee (tải động),
// nên có thể không parse được từ HTML tĩnh.
function execute(key, page) {
    if (!page) page = '1';
    var apiUrl = BASE_URL + "/vi/search/" + encodeURIComponent(key) + "?page=" + page;

    var response = fetch(apiUrl, { headers: { "User-Agent": UA, "Referer": REFERRER } });
    if (response.ok) {
        var html = response.text();
        var r = parseMissavList(html);

        var next = parseInt(page, 10) + 1;
        if (r.items.length === 0 || next > r.totalPages) next = null;

        return Response.success(r.items, next);
    }
    return null;
}
