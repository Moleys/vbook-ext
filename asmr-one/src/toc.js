load('config.js');

// Flatten the nested track tree from /api/tracks/<id> into a flat playlist.
// Only "audio" entries become chapters; folder titles are kept as a prefix.
function collect(node, out, prefix) {
    var type = node.type;
    if (type === "audio") {
        var quality = "low";
        try {
            quality = STREAM_QUALITY;
        } catch (e) {
        }
        var streamUrl = "";
        if (quality === "high") {
            streamUrl = node.mediaStreamUrl || node.streamLowQualityUrl || "";
        } else {
            streamUrl = node.streamLowQualityUrl || node.mediaStreamUrl || "";
        }
        if (!streamUrl) return;
        var name = node.title || "";
        // Strip the file extension from the display name (.wav / .mp3 / ...)
        name = name.replace(/\.[a-zA-Z0-9]{1,5}$/, "");
        if (prefix) name = prefix + " / " + name;
        var desc = "";
        if (node.duration) desc = fmtDuration(node.duration);
        out.push({
            name: name,
            url: streamUrl,
            description: desc,
            lock: false,
            pay: false,
        });
        return;
    }
    if (node.children) {
        var childPrefix = prefix;
        if (type === "folder" && node.title) {
            childPrefix = prefix ? prefix + " / " + node.title : node.title;
        }
        for (var i = 0; i < node.children.length; i++) {
            collect(node.children[i], out, childPrefix);
        }
    }
}

function execute(url) {
    var m = url.match(/work\/(\d+)/);
    if (!m) return Response.error("URL không hợp lệ: " + url);
    var id = m[1];

    var resp = fetch(API_BASE + "/api/tracks/" + id, { headers: { "Referer": BASE_URL } });
    if (!resp.ok) return Response.error("HTTP " + resp.status);
    var tree = resp.json();

    var chapters = [];
    for (var i = 0; i < tree.length; i++) {
        collect(tree[i], chapters, "");
    }
    if (chapters.length === 0) return Response.error("Không có track nào");

    return Response.success(chapters);
}
