load('config.js');

function execute(url) {
    url = normalizeUrl(url);
    if (isMagazineUrl(url)) return magazineDetail(url);
    if (isNoteUrl(url)) return noteDetail(url);
    if (isCreatorUrl(url)) return creatorDetail(url);
    return Response.error("note.com: chỉ hỗ trợ bài viết, tạp chí (/m/...) và trang tác giả");
}

function noteDetail(url) {
    let api = apiGet("/api/v3/notes/" + noteKey(url));
    let failure = apiError("note.com", api);
    if (failure) return failure;
    let note = api.data && api.data.data ? api.data.data : null;
    if (!note) return Response.error("note.com: không có dữ liệu bài viết");

    let user = note.user || {};
    let author = String(user.nickname || user.name || user.urlname || "");
    let urlname = String(user.urlname || "");

    let translation = translatedNote(noteKey(url), url);

    // Chip bấm được: tác giả → danh sách bài của tác giả, danh mục chính thức, hashtag.
    let tags = [];
    if (urlname !== "") {
        tags.push({ title: "著者: " + author, input: urlname, script: "creator.js" });
    }
    let categoryChips = noteCategoryChips(note);
    for (let i = 0; i < categoryChips.length; i++) tags.push(categoryChips[i]);

    let categoryNames = categoryNameMatched(note);
    let hashtags = note.hashtag_notes || [];
    for (let i = 0; i < hashtags.length; i++) {
        let tag = hashtags[i].hashtag ? tagNameOf(hashtags[i].hashtag.name) : "";
        if (tag !== "" && !categoryNames[tag]) tags.push({ title: "#" + tag, input: tag, script: "hashtag.js" });
    }

    let info = [];
    info.push("著者: " + author);
    if (note.publish_at) info.push("公開: " + formatDateTime(note.publish_at));
    info.push("スキ: " + (parseInt(note.like_count, 10) || 0) + " · コメント: " + (parseInt(note.comment_count, 10) || 0));
    let price = parseInt(note.price, 10) || 0;
    if (price > 0) {
        info.push("価格: " + price + "円" + (note.can_read ? "（購入済み）" : "（未購入）"));
    }
    let magazines = note.belonging_magazine_keys || [];
    if (magazines.length && urlname !== "") {
        info.push("マガジン: <a href=\"" + BASE_URL + "/" + urlname + "/m/" + magazines[0] + "\">" + magazines[0] + "</a>");
    }
    info.push("元記事: <a href=\"" + BASE_URL + "/" + urlname + "/n/" + noteKey(url) + "\">note.com</a>");
    if (translation) info.push("表示言語: English（note.com 翻訳）");

    let suggests = [];
    if (urlname !== "" && authorSuggestsEnabled()) {
        suggests.push({ title: "同じ著者の記事", input: urlname, script: "similar.js" });
    }

    // Tab bấm được: toàn bộ bài của tác giả + các tạp chí chứa bài này.
    let genres = [];
    if (urlname !== "") {
        genres.push({ title: "著者の記事", input: urlname, script: "creator.js" });
    }
    for (let i = 0; i < magazines.length; i++) {
        let magazineKeyValue = String(magazines[i]);
        let magazineTitle = magazineName(magazineKeyValue);
        genres.push({
            title: magazineTitle !== "" ? magazineTitle : "マガジン " + magazineKeyValue,
            input: "/" + urlname + "/m/" + magazineKeyValue,
            script: "magazine.js"
        });
    }

    let description = String(note.description || "");
    if (description === "") {
        description = stripHtml(translation ? translation.body : note.body).substring(0, 400);
    }

    return Response.success({
        name: translation && translation.title ? String(translation.title) : String(note.name || ""),
        author: author,
        cover: String(field(note, "eyecatch", "eyecatch") || ""),
        description: description,
        detail: info.join("<br>"),
        url: url,
        type: "novel",
        format: "novel",
        ongoing: false,
        locale: "ja",
        tags: tags,
        genres: genres,
        suggests: suggests,
        comments: [{ title: "コメント", input: noteKey(url), script: "comments.js" }]
    });
}

function magazineDetail(url) {
    let key = magazineKey(url);
    let api = apiGet("/api/v1/layout/magazine/" + key);
    let failure = apiError("note.com", api);
    if (failure) return failure;
    let magazine = api.data && api.data.data ? api.data.data.magazine_layout : null;
    if (!magazine) return Response.error("note.com: không có dữ liệu tạp chí");

    let user = magazine.user || {};
    let urlname = String(user.urlname || "");
    let info = [];
    info.push("著者: " + String(user.name || user.nickname || urlname));
    info.push("記事数: " + (parseInt(magazine.note_count, 10) || 0));
    if ((parseInt(magazine.price, 10) || 0) > 0) info.push("価格: " + magazine.price + "円");
    if (magazine.updated_at) info.push("更新: " + formatDate(magazine.updated_at));
    info.push("元ページ: <a href=\"" + BASE_URL + "/" + urlname + "/m/" + key + "\">note.com</a>");

    let suggests = [];
    if (urlname !== "" && authorSuggestsEnabled()) {
        suggests.push({ title: "同じ著者の記事", input: urlname, script: "similar.js" });
    }

    let genres = [];
    if (urlname !== "") {
        genres.push({ title: "著者の記事", input: urlname, script: "creator.js" });
        genres.push({ title: "著者のマガジン", input: "magazines:" + urlname, script: "creator.js" });
    }

    return Response.success({
        name: String(magazine.name || ""),
        author: String(user.name || user.nickname || urlname),
        cover: String(magazine.cover || magazine.cover_rectangle || ""),
        description: String(magazine.description || ""),
        detail: info.join("<br>"),
        url: url,
        type: "novel",
        format: "novel",
        ongoing: true,
        locale: "ja",
        tags: urlname !== "" ? [{ title: "著者: " + String(user.name || user.nickname || urlname), input: urlname, script: "creator.js" }] : [],
        genres: genres,
        suggests: suggests
    });
}

function creatorDetail(url) {
    let urlname = urlnameOf(url);
    let api = apiGet("/api/v2/creators/" + encodeURIComponent(urlname));
    let failure = apiError("note.com", api);
    if (failure) return failure;
    let creator = api.data && api.data.data ? api.data.data : null;
    if (!creator) return Response.error("note.com: không có dữ liệu tác giả");

    let info = [];
    info.push("記事: " + (parseInt(creator.noteCount, 10) || 0) + " · マガジン: " + (parseInt(creator.magazineCount, 10) || 0));
    if (creator.followerCount !== undefined) info.push("フォロワー: " + creator.followerCount);
    info.push("元ページ: <a href=\"" + BASE_URL + "/" + urlname + "\">note.com</a>");

    return Response.success({
        name: String(creator.nickname || creator.urlname || urlname),
        author: String(creator.nickname || urlname),
        cover: String(creator.profileImageUrl || ""),
        description: String(creator.profile || ""),
        detail: info.join("<br>"),
        url: url,
        type: "novel",
        format: "novel",
        ongoing: true,
        locale: "ja",
        genres: [{ title: "マガジン", input: "magazines:" + urlname, script: "creator.js" }]
    });
}
