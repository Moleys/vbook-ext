load('config.js');

function execute(url) {
    var response = fetch(url, { headers: { "User-Agent": UA, "Referer": REFERRER } });
    if (!response.ok) return null;

    var html = normalizeHtml(response.text());

    var title = getMeta(html, "og:title");
    var thumb = getMeta(html, "og:image");
    var desc = getMeta(html, "og:description");

    var code = getField(html, "Mã số") || getField(html, "Code");
    var releaseDate = getField(html, "Ngày phát hành") || getField(html, "Release date");
    var studio = getField(html, "nhà sản xuất") || getField(html, "Maker");
    var label = getField(html, "Nhãn") || getField(html, "Label");
    var director = getField(html, "Giám đốc") || getField(html, "Director");

    if (!code) {
        var dvdIdMatch = html.match(/dvdId:\s*'([^']+)'/);
        code = dvdIdMatch ? dvdIdMatch[1] : "";
    }

    var casts = getMultiField(html, "Nữ diễn viên") || getMultiField(html, "Actresses");
    var genres = getMultiField(html, "thể loại") || getMultiField(html, "Genre") || getMultiField(html, "Genres");

    var detail = [];
    if (code) detail.push("Mã: " + code);
    if (releaseDate) detail.push("Phát hành: " + releaseDate);
    if (studio) detail.push("Studio: " + studio);
    if (label) detail.push("Label: " + label);
    if (director) detail.push("Đạo diễn: " + director);
    if (genres) detail.push("Thể loại: " + genres);
    if (casts) detail.push("Diễn viên: " + casts);

    return Response.success({
        name: cleanText(title) || code || "MissAV",
        cover: thumb,
        author: "missav",
        description: cleanText(desc),
        detail: detail.join("<br>"),
        ongoing: false,
        genres: [],
        format: "series",
        host: BASE_URL
    });
}
