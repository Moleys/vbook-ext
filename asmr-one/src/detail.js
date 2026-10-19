load('config.js');

function execute(url) {
    var m = url.match(/work\/(\d+)/);
    if (!m) return Response.error("URL không hợp lệ: " + url);
    var id = m[1];

    var resp = fetch(API_BASE + "/api/workInfo/" + id, { headers: { "Referer": BASE_URL } });
    if (!resp.ok) return Response.error("HTTP " + resp.status);
    var w = resp.json();

    var authorParts = [];
    if (w.circle && w.circle.name) authorParts.push(w.circle.name);
    if (w.vas) {
        for (var i = 0; i < w.vas.length; i++) {
            authorParts.push(w.vas[i].name);
        }
    }

    var detailHtml = "";
    if (w.source_id) detailHtml = detailHtml + "<b>作品号:</b> " + w.source_id + "<br>";
    if (w.release) detailHtml = detailHtml + "<b>发售日:</b> " + w.release + "<br>";
    if (w.duration) detailHtml = detailHtml + "<b>时长:</b> " + fmtDuration(w.duration) + "<br>";
    if (w.rate_average_2dp) detailHtml = detailHtml + "<b>评分:</b> " + w.rate_average_2dp + " (" + w.rate_count + " votes)<br>";
    if (w.dl_count) detailHtml = detailHtml + "<b>下载数:</b> " + w.dl_count + "<br>";
    if (w.price) detailHtml = detailHtml + "<b>价格:</b> " + w.price + " 日元<br>";
    if (w.age_category_string) detailHtml = detailHtml + "<b>年龄分级:</b> " + w.age_category_string + "<br>";

    var tags = [];
    if (w.tags) {
        for (var t = 0; t < w.tags.length; t++) {
            var tn = localTagName(w.tags[t]);
            if (!tn) continue;
            tags.push({ title: tn, input: tn, script: "search.js" });
        }
    }

    var genres = [];
    if (w.circle && w.circle.name) {
        genres.push({ title: "同人作品: " + w.circle.name, input: w.circle.name, script: "search.js" });
    }

    return Response.success({
        name: w.title || "",
        author: authorParts.join(" / "),
        cover: w.mainCoverUrl || w.thumbnailCoverUrl || w.samCoverUrl || "",
        description: (w.title || "") + "<br><br>" + detailHtml,
        detail: detailHtml,
        url: url,
        type: "audio",
        format: "album",
        ongoing: false,
        nsfw: w.nsfw ? true : false,
        tags: tags,
        genres: genres,
        suggests: [],
    });
}
