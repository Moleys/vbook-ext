load('config.js');

function execute(url) {
    var response = fetch(url, { headers: { "User-Agent": UA } });
    if (!response.ok) return null;

    var html = response.text();
    var title = getMeta(html, "og:title");
    var img = getMeta(html, "og:image");
    var desc = getMeta(html, "og:description");

    var detail = [];
    var canonicalM = html.match(/link\s+rel="canonical"\s+href="([^"]+)"/i);
    if (canonicalM) detail.push("Link: " + canonicalM[1]);

    return Response.success({
        name: cleanText(title) || "Xhamster",
        cover: img,
        author: "xhamster",
        description: cleanText(desc),
        detail: detail.join("<br>"),
        ongoing: false,
        genres: [],
        format: "series",
        host: BASE_URL
    });
}
