load('config.js');

// Danh sách phổ biến từ /api/recommender/popular (POST).
function execute(query, page) {
    page = page || "1";
    var resp = fetch(API_BASE + "/api/recommender/popular", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Referer": BASE_URL },
        body: JSON.stringify({ keyword: "", page: parseInt(page, 10), pageSize: 20, subtitle: null }),
    });
    if (!resp.ok) return Response.error("HTTP " + resp.status);
    var json = resp.json();

    return Response.success(parseWorks(json), nextPageToken(json, page));
}
