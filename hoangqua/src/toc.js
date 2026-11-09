load('config.js');
// toc.js — episodes come from the detail payload; each entry routes to chap.js.
function execute(url) {
    var id = parseId(url);
    if (!id) return Response.error("URL không hợp lệ: " + url);
    var d = edgeGet("/api/videos/" + id);

    var episodes = [];
    (d.episodes || []).forEach(function (ep) {
        var title = ep.title || ("Tập " + ep.ep_num);
        if (title.length > 60) title = title.substring(0, 60) + "…";
        episodes.push({
            name: title,
            url: videoLink(id, ep.ep_num),
            description: ep.duration ? Math.round(Number(ep.duration) / 60) + " phút" : "",
            lock: Number(ep.status) !== 1,
            pay: false
        });
    });

    return Response.success(episodes);
}
