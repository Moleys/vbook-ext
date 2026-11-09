load('config.js');
// comments.js — referenced from detail.js `comments`.
// input is JSON {id, ep}; paginated (items, next).
function execute(input, page) {
    page = page || "1";
    var payload;
    try {
        payload = JSON.parse(input);
    } catch (error) {
        return Response.error("input không hợp lệ");
    }

    var data = edgeGet("/api/videos/" + payload.id + "/comments?ep=" + payload.ep
        + "&page=" + page + "&size=20");

    function mapComment(c) {
        return {
            name: c.nickname || "",
            avatar: c.avatar || "",
            content: c.text || "",
            description: (c.time || "") + (c.ip_region ? " · " + c.ip_region : "")
                + (c.like_count ? " · ♥ " + c.like_count : ""),
            replies: (c.reply_list || []).map(mapComment)
        };
    }

    return Response.success((data.items || []).map(mapComment), hasNext(data.pagination, page));
}
