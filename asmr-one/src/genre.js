load('config.js');

// Danh sách tag từ /api/tags/. Bấm vào tag sẽ gọi search.js với tên tag
// (API chỉ lọc theo tag qua search theo tên, /api/works không hỗ trợ tagId).
function execute() {
    var resp = fetch(API_BASE + "/api/tags/", { headers: { "Referer": BASE_URL } });
    if (!resp.ok) return Response.error("HTTP " + resp.status);
    var tags = resp.json();

    var genres = [];
    for (var i = 0; i < tags.length; i++) {
        var name = localTagName(tags[i]);
        if (!name) continue;
        var title = name;
        if (tags[i].count) title = name + " (" + tags[i].count + ")";
        genres.push({ title: title, input: name, script: "search.js" });
    }

    return Response.success(genres);
}
