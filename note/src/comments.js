load('config.js');

function commentItem(comment) {
    let user = comment.user || {};
    let replies = comment.children || comment.replies || [];
    let mapped = [];
    for (let i = 0; i < replies.length; i++) {
        let reply = commentItem(replies[i]);
        if (reply.content !== "") mapped.push(reply);
    }
    return {
        name: String(user.nickname || user.name || user.urlname || "名無し"),
        avatar: String(user.user_profile_image_path || user.user_profile_image_url || user.profileImageUrl || ""),
        content: String(comment.body || comment.content || ""),
        description: formatDateTime(comment.created_at || comment.createdAt || ""),
        replies: mapped
    };
}

// Bình luận của một bài viết (note.com thường tắt bình luận nên nhiều bài trả về rỗng).
function execute(input, page) {
    let key = noteKey(input) || String(input || "").trim();
    if (!/^n[a-z0-9]+$/i.test(key)) return Response.error("note.com: không xác định được bài viết");
    page = page || "1";

    let api = apiGet("/api/v3/notes/" + key + "/comments?page=" + page);
    let failure = apiError("note.com", api);
    if (failure) return failure;
    let body = api.data || {};
    let list = body.data || [];
    let items = [];
    for (let i = 0; i < list.length; i++) {
        let item = commentItem(list[i]);
        if (item.content !== "" || item.name !== "") items.push(item);
    }
    return Response.success(items, body.next_page ? String(body.next_page) : "");
}
