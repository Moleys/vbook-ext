load('config.js');

// Nội dung một bài viết. Bản gốc lấy từ /api/v3/notes/{key}; nếu bật chế độ
// "Ngôn ngữ nội dung = en" thì dùng bản dịch tiếng Anh của note.com.
function execute(url) {
    let key = noteKey(url);
    if (key === "") return Response.error("note.com: URL bài viết không hợp lệ");

    let api = apiGet("/api/v3/notes/" + key);
    let failure = apiError("note.com", api);
    if (failure) return failure;
    let note = api.data && api.data.data ? api.data.data : null;
    if (!note) return Response.error("note.com: không có dữ liệu bài viết");

    if (note.can_read === false) {
        return Response.error("note.com: bài viết trả phí, cần mua trên note.com để đọc");
    }

    let translation = translatedNote(key, url);
    if (translation) {
        return Response.success(String(translation.body), String(translation.title || note.name || ""));
    }

    let body = String(note.body || "");
    if (body === "") return Response.error("note.com: bài viết không có nội dung");

    return Response.success(body, String(note.name || ""));
}
