load('config.js');
// chap.js — one episode, two servers from the play payload (AVC + optional HEVC).
// track.data is a direct m3u8 URL; keep titles unique so the player remembers them.
function execute(url) {
    var id = parseId(url);
    var ep = parseEp(url);
    if (!id) return Response.error("URL không hợp lệ: " + url);

    var p = edgeGet("/api/videos/" + id + "/play?ep=" + ep + "&page_texts=0");
    if (!p.video_url) return Response.error("Tập " + ep + " chưa có nguồn phát");

    var tracks = [{ title: "AVC", data: p.video_url }];
    if (p.video_url_hevc) tracks.push({ title: "HEVC", data: p.video_url_hevc });
    return Response.success(tracks);
}
