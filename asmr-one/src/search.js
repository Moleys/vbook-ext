load('config.js');

// Doubles as the listing script for genre.js entries: `query` is either a
// keyword or a tag name (the site's search matches tag names too).
function execute(query, page) {
    query = query || "";
    page = page || "1";

    var resp = fetch(API_BASE + "/api/search/" + encodeURIComponent(query), {
        queries: { page: page, pageSize: "20" },
        headers: { "Referer": BASE_URL },
    });
    if (!resp.ok) return Response.error("HTTP " + resp.status);
    var json = resp.json();

    return Response.success(parseWorks(json), nextPageToken(json, page));
}
