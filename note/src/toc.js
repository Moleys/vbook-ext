load('config.js');

function execute(url) {
    let text = String(url || "");

    // Trang mục lục do page.js trả về (URL API).
    if (text.indexOf("/api/v1/layout/magazine/") >= 0 && text.indexOf("/section") >= 0) {
        let api = apiGetUrl(text);
        let failure = apiError("note.com", api);
        if (failure) return failure;
        let section = api.data && api.data.data ? api.data.data.section : null;
        if (!section) return Response.error("note.com: không có dữ liệu mục lục tạp chí");
        return Response.success(magazineChapters(section.contents || []));
    }
    if (text.indexOf("/api/v2/creators/") >= 0 && text.indexOf("/contents") >= 0) {
        let api = apiGetUrl(text);
        let failure = apiError("note.com", api);
        if (failure) return failure;
        let body = api.data && api.data.data ? api.data.data : null;
        if (!body) return Response.error("note.com: không có dữ liệu mục lục tác giả");
        return Response.success(creatorChapters(body.contents || []));
    }

    // Gọi trực tiếp không qua page.js.
    let normalized = normalizeUrl(text);
    if (isNoteUrl(normalized)) {
        let key = noteKey(normalized);
        let api = apiGet("/api/v3/notes/" + key);
        if (!api.ok || !api.data || !api.data.data) return Response.error("note.com: không tải được bài viết");
        let chapter = noteChapter(api.data.data);
        let translation = translatedNote(key, normalized);
        if (translation && translation.title) chapter.name = String(translation.title);
        return Response.success([chapter]);
    }
    if (isMagazineUrl(normalized)) {
        let section = magazineSection(magazineKey(normalized), 1);
        if (!section) return Response.error("note.com: không tải được mục lục tạp chí");
        return Response.success(magazineChapters(section.contents || []));
    }
    if (isCreatorUrl(normalized)) {
        let urlname = urlnameOf(normalized);
        let api = apiGet("/api/v2/creators/" + encodeURIComponent(urlname) + "/contents?kind=note&page=1&per=20");
        if (!api.ok || !api.data || !api.data.data) return Response.error("note.com: không tải được mục lục tác giả");
        return Response.success(creatorChapters(api.data.data.contents || []));
    }

    return Response.error("note.com: URL mục lục không hợp lệ");
}
