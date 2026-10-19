load('config.js');

// `query` là từ khoá, hoặc một URL/đường dẫn note.com (tab, hashtag, tác giả, tạp chí).
// note.com chặn API tìm kiếm từ ngoài trình duyệt (403) nên từ khoá được tra theo hashtag.
function execute(query, page) {
    query = String(query || "").trim();
    page = page || "1";

    if (query === "") return trendList("", page);

    if (query.indexOf("http") === 0 || query.charAt(0) === "/") {
        let url = query.indexOf("http") === 0 ? query : BASE_URL + query;
        if (isMagazineUrl(url)) return magazineNotesList(url, page);
        if (isNoteUrl(url)) {
            let api = apiGet("/api/v3/notes/" + noteKey(url));
            if (!api.ok || !api.data || !api.data.data) return Response.error("note.com: không tải được bài viết");
            let item = noteItem(api.data.data);
            return Response.success(item ? [item] : [], "");
        }
        if (url.indexOf("/tag/") >= 0) return hashtagList(url, page);
        if (isCreatorUrl(url)) return creatorList(url, page);
        return trendList("", page);
    }

    return hashtagList(query, page);
}
