load('config.js');
load('crypto.js');
// detail.js — url is videoLink(id): /video/<id>.
function execute(url) {
    var id = parseId(url);
    if (!id) return Response.error("URL không hợp lệ: " + url);
    var d = edgeGet("/api/videos/" + id);

    var detail = "Điểm: " + (d.score || "") + "\n"
        + "Tập: " + d.episode_count + "\n"
        + (d.is_finished ? "Đã hoàn tất" : "Đang cập nhật") + "\n"
        + "Thích: " + (d.counts && d.counts.like ? d.counts.like : 0) + " · "
        + "Thu thập: " + (d.counts && d.counts.collect ? d.counts.collect : 0) + " · "
        + "Bình luận: " + (d.counts && d.counts.comment ? d.counts.comment : 0) + "\n"
        + "Tác giả: " + (d.author && d.author.name ? d.author.name : "");

    return Response.success({
        name: d.title,
        author: d.author && d.author.name ? d.author.name : "",
        cover: coverUrl(d.cover),
        description: d.description || "",
        detail: detail,
        url: videoLink(id),
        type: "video",
        format: "short",
        ongoing: !d.is_finished,
        tags: (d.tags || []).map(function (t) {
            return { title: t, input: t, script: "search.js" };
        }),
        comments: [
            { title: "Bình luận", input: JSON.stringify({ id: id, ep: 1 }), script: "comments.js" }
        ]
    });
}
