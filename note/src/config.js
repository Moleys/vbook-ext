// note.com — cấu hình và thư viện dùng chung cho mọi script của extension.
let BASE_URL = "https://note.com";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}

var NOTE_API_HEADERS = {
    "Accept": "application/json, text/plain, */*",
    "x-requested-with": "XMLHttpRequest",
    "Referer": "https://note.com/"
};

function normalizeUrl(url) {
    return String(url || "").replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}

function maxTocPages() {
    try {
        let value = parseInt(MAX_TOC_PAGES, 10);
        if (value > 0) return value;
    } catch (error) {
    }
    return 10;
}

function authorSuggestsEnabled() {
    try {
        return String(AUTHOR_SUGGESTS) === "true";
    } catch (error) {
        return true;
    }
}

// Chế độ ngôn ngữ nội dung: "off" (bản gốc tiếng Nhật) hoặc "en" (bản dịch tiếng Anh của note.com).
function translationLang() {
    try {
        let value = String(TRANSLATION || "");
        if (value !== "" && value !== "off") return value;
    } catch (error) {
    }
    return "";
}

// Link note.com dạng ?hl=en (bản dịch tiếng Anh của chính note.com) cũng bật chế độ dịch.
function wantsEnglish(url) {
    return /[?&]hl=en(?:-[A-Za-z]{2})?(?:&|$)/i.test(String(url || ""));
}

function translationLangFor(url) {
    let lang = translationLang();
    if (lang === "" && wantsEnglish(url)) lang = "en";
    return lang;
}

// ---------------------------------------------------------------- HTTP helpers

// note.com trả JSON cho các endpoint /api/... khi request có header kiểu trình duyệt.
function apiGetUrl(url) {
    let response = fetch(url, { headers: NOTE_API_HEADERS, timeout: 30000 });
    let data = null;
    if (response.ok) {
        try {
            data = response.json();
        } catch (error) {
            data = null;
        }
    }
    return { ok: response.ok, status: response.status, data: data };
}

function apiGet(path) {
    return apiGetUrl(BASE_URL + path);
}

function apiError(prefix, api) {
    if (!api.ok) return Response.error(prefix + ": HTTP " + api.status);
    if (!api.data) return Response.error(prefix + ": dữ liệu trả về không hợp lệ");
    return null;
}

function stripHtml(html) {
    return String(html || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, "\"")
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
}

// ---------------------------------------------------------------- URL helpers

function noteKey(url) {
    let text = String(url || "");
    let match = /\/(?:n|notes)\/(n[a-z0-9]+)/i.exec(text);
    if (match) return match[1];
    if (/^n[a-z0-9]{6,}$/i.test(text)) return text;
    return "";
}

function magazineKey(url) {
    let text = String(url || "");
    let match = /\/m\/(m[a-z0-9]+)/i.exec(text);
    if (match) return match[1];
    if (/^m[a-z0-9]{6,}$/i.test(text)) return text;
    return "";
}

// Tên tác giả (urlname) từ URL bài viết / tạp chí / trang tác giả.
function urlnameOf(url) {
    let match = /(?:https?:\/\/)?(?:www\.)?note\.(?:com|jp)\/([A-Za-z0-9_\-]+)/i.exec(String(url || ""));
    if (!match) return "";
    let name = match[1];
    if (/^(n|m|tag|tags|search|trend|topic|topics|magazine|magazines|about|login|signup|terms|policy|help|api)$/i.test(name)) return "";
    return name;
}

function isNoteUrl(url) {
    return noteKey(url) !== "";
}

function isMagazineUrl(url) {
    return magazineKey(url) !== "";
}

function isCreatorUrl(url) {
    let text = String(url || "").replace(/[?#].*$/, "").replace(/\/+$/, "");
    let match = /^(?:https?:\/\/)?(?:www\.)?note\.(?:com|jp)\/([A-Za-z0-9_\-]+)$/i.exec(text);
    if (!match) return false;
    let name = match[1];
    if (/^(n|m|tag|tags|search|trend|topic|topics|magazine|magazines|about|login|signup|terms|policy|help|api)$/i.test(name)) return false;
    return true;
}

function tagNameOf(input) {
    let text = String(input || "").trim();
    let match = /note\.(?:com|jp)\/tag\/([^\/?#]+)/i.exec(text);
    if (match) {
        try {
            text = decodeURIComponent(match[1]);
        } catch (error) {
            text = match[1];
        }
    }
    if (text.charAt(0) === "#") text = text.substring(1);
    return text.trim();
}

// ---------------------------------------------------------------- field helpers

function field(object, snake, camel) {
    if (!object) return undefined;
    if (object[snake] !== undefined && object[snake] !== null) return object[snake];
    if (camel && object[camel] !== undefined && object[camel] !== null) return object[camel];
    return undefined;
}

function formatDate(value) {
    let match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value || ""));
    return match ? match[1] + "-" + match[2] + "-" + match[3] : "";
}

function formatDateTime(value) {
    let match = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/.exec(String(value || ""));
    if (!match) return formatDate(value);
    return match[1] + "-" + match[2] + "-" + match[3] + " " + match[4] + ":" + match[5];
}

function firstGroup(text, regex) {
    let match = regex.exec(String(text || ""));
    return match ? match[1] : "";
}

function unescapeJson(text) {
    return String(text || "")
        .replace(/\\u([0-9a-fA-F]{4})/g, function (all, hex) { return String.fromCharCode(parseInt(hex, 16)); })
        .replace(/\\n/g, " ")
        .replace(/\\r/g, " ")
        .replace(/\\t/g, " ")
        .replace(/\\"/g, "\"")
        .replace(/\\\\/g, "\\");
}

// ---------------------------------------------------------------- item mappers

// Ảnh bìa dự phòng cho bài chỉ có chữ (note.com trả về rỗng cho các bài không có eyecatch).
var NOTE_PLACEHOLDER_COVER = "https://assets.st-note.com/poc-image/manual/production/default_top_ogp_202212.png";

function noteItem(note) {
    if (!note) return null;
    let user = note.user || {};
    // Mỗi API của note.com đặt tên ảnh bìa một khác: eyecatch (notes, creator, top_articles),
    // eyecatch_url (hashtag, layout magazine), sp_eyecatch_url, thumbnail_external_url.
    let cover = field(note, "eyecatch", "eyecatch");
    if (!cover) cover = field(note, "eyecatch_url", "eyecatchUrl");
    if (!cover) cover = field(note, "sp_eyecatch", "spEyecatch");
    if (!cover) cover = field(note, "sp_eyecatch_url", "spEyecatchUrl");
    if (!cover) cover = field(note, "thumbnail_external_url", "thumbnailExternalUrl");
    if (!cover) cover = NOTE_PLACEHOLDER_COVER;
    let date = formatDate(field(note, "publish_at", "publishAt"));
    let likes = field(note, "like_count", "likeCount");
    let price = parseInt(field(note, "price", "price"), 10) || 0;
    let bits = [];
    if (date) bits.push(date);
    if (likes) bits.push("♡" + likes);
    if (price > 0) bits.push("有料 " + price + "円");
    return {
        name: String(note.name || ""),
        cover: String(cover || ""),
        link: "/" + String(user.urlname || "") + "/n/" + String(note.key || ""),
        description: bits.join(" · "),
        tag: price > 0 ? "有料" : ""
    };
}

function magazineItem(magazine) {
    if (!magazine) return null;
    let user = magazine.user || {};
    let count = field(magazine, "note_count", "noteCount");
    let followers = field(magazine, "follower_count", "followerCount");
    let price = parseInt(magazine.price, 10) || 0;
    let bits = [];
    if (count) bits.push(count + "記事");
    if (followers) bits.push("フォロワー " + followers);
    if (price > 0) bits.push("有料 " + price + "円");
    return {
        name: String(magazine.name || ""),
        cover: String(magazine.cover || magazine.coverRectangle || magazine.cover_image_url || ""),
        link: "/" + String(user.urlname || "") + "/m/" + String(magazine.key || ""),
        description: bits.join(" · "),
        tag: "マガジン"
    };
}

function noteChapter(note) {
    let user = note.user || {};
    let price = parseInt(field(note, "price", "price"), 10) || 0;
    let canRead = field(note, "can_read", "canRead");
    return {
        name: String(note.name || ""),
        url: "/" + String(user.urlname || "") + "/n/" + String(note.key || ""),
        description: formatDate(field(note, "publish_at", "publishAt")),
        lock: canRead === false,
        pay: price > 0
    };
}

function magazineChapter(magazine) {
    let user = magazine.user || {};
    return {
        name: String(magazine.name || ""),
        url: "/" + String(user.urlname || "") + "/m/" + String(magazine.key || ""),
        description: (field(magazine, "note_count", "noteCount") || 0) + "記事",
        lock: false,
        pay: (parseInt(magazine.price, 10) || 0) > 0
    };
}

// ---------------------------------------------------------------- list scripts

function hashtagList(input, page) {
    let tag = tagNameOf(input);
    if (tag === "") return Response.error("Hashtag không hợp lệ");
    page = page || "1";
    let api = apiGet("/api/v3/hashtags/" + encodeURIComponent(tag) + "/notes?page=" + page);
    if (!api.ok) {
        if (api.status === 404) return Response.error("note.com: không có hashtag #" + tag + " (note.com chặn API tìm kiếm từ extension — hãy tìm bằng hashtag)");
        return Response.error("note.com: HTTP " + api.status + " khi tải hashtag #" + tag);
    }
    let body = api.data && api.data.data ? api.data.data : null;
    if (!body) return Response.error("note.com: dữ liệu hashtag không hợp lệ");
    let notes = body.notes || [];
    let items = [];
    for (let i = 0; i < notes.length; i++) {
        let item = noteItem(notes[i]);
        if (item && item.name !== "") items.push(item);
    }
    let next = body.is_last_page ? "" : String(body.next_page || "");
    if (next === "" && !body.is_last_page) next = String(parseInt(page, 10) + 1);
    return Response.success(items, next);
}

// Đọc payload RSC của một trang note.com (/trend, /topic/...): danh sách bài chỉ nằm
// trong script self.__next_f.push, không có trong DOM nên phải tách chuỗi rồi parse.
function sectionsFromHtml(html) {
    let payload = "";
    let chunkRe = /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;
    let chunk;
    while ((chunk = chunkRe.exec(html)) !== null) {
        payload += chunk[1];
    }
    if (payload === "") return [];
    payload = payload.replace(/\\"/g, "\"").replace(/\\u0026/g, "&");

    let headRe = /"labelName":"((?:[^"\\]|\\.)*)","notes":\[/g;
    let heads = [];
    let head;
    while ((head = headRe.exec(payload)) !== null) {
        heads.push({ label: unescapeJson(head[1]), start: head.index, body: headRe.lastIndex });
    }
    let sections = [];
    for (let i = 0; i < heads.length; i++) {
        let end = (i + 1 < heads.length) ? heads[i + 1].start : payload.length;
        let slice = payload.substring(heads[i].body, end);
        let parts = slice.split(/"key":"n/).slice(1);
        let notes = [];
        for (let j = 0; j < parts.length; j++) {
            let part = parts[j];
            let keyMatch = /^([a-z0-9]+)"/.exec(part);
            if (!keyMatch) continue;
            notes.push({
                key: "n" + keyMatch[1],
                name: unescapeJson(firstGroup(part, /"name":"((?:[^"\\]|\\.)*)"/)),
                publish_at: firstGroup(part, /"publishAt":"([^"]*)"/),
                eyecatch: unescapeJson(firstGroup(part, /"eyecatchUrl":"((?:[^"\\]|\\.)*)"/)),
                user: { urlname: firstGroup(part, /"urlname":"([^"]*)"/) }
            });
        }
        if (notes.length) sections.push({ label: heads[i].label, notes: notes });
    }
    return sections;
}

function trendSections() {
    let response = fetch(BASE_URL + "/trend", { headers: { "Referer": BASE_URL + "/" }, timeout: 30000 });
    if (!response.ok) return [];
    return sectionsFromHtml(response.text());
}

function topicSections(engName) {
    let response = fetch(BASE_URL + "/topic/" + encodeURIComponent(engName), { headers: { "Referer": BASE_URL + "/" }, timeout: 30000 });
    if (!response.ok) return [];
    return sectionsFromHtml(response.text());
}

function sectionsToItems(sections) {
    let items = [];
    let seen = {};
    for (let i = 0; i < sections.length; i++) {
        let notes = sections[i].notes;
        for (let j = 0; j < notes.length; j++) {
            let item = noteItem(notes[j]);
            if (!item || item.name === "" || seen[item.link]) continue;
            seen[item.link] = true;
            items.push(item);
        }
    }
    return items;
}

// Bài "急上昇" lấy từ API /api/v3/notes/top_articles. Dùng API thay vì đọc trang /trend vì
// note.com trả cho app một biến thể HTML không nhúng sẵn dữ liệu (payload rỗng).
function topArticleItems(page) {
    let api = apiGet("/api/v3/notes/top_articles?page=" + (page || "1"));
    if (!api.ok || !api.data || !api.data.data) return [];
    let body = api.data.data;
    let articles = body.articles || body.notes || [];
    let items = [];
    for (let i = 0; i < articles.length; i++) {
        let item = noteItem(articles[i]);
        if (item && item.name !== "") items.push(item);
    }
    return items;
}

function trendList(input, page) {
    page = page || "1";
    let api = apiGet("/api/v3/notes/top_articles?page=" + page);
    if (api.ok && api.data && api.data.data) {
        let articles = api.data.data.articles || api.data.data.notes || [];
        let items = [];
        for (let i = 0; i < articles.length; i++) {
            let item = noteItem(articles[i]);
            if (item && item.name !== "") items.push(item);
        }
        if (items.length) {
            return Response.success(items, api.data.data.last_page ? "" : String(parseInt(page, 10) + 1));
        }
    }
    // Dự phòng: đọc payload của trang /trend (chỉ hoạt động với biến thể HTML có nhúng dữ liệu).
    let fallback = sectionsToItems(trendSections());
    if (!fallback.length) return Response.error("note.com: không tải được danh sách nổi bật");
    return Response.success(fallback, "");
}

// ---------------------------------------------------------------- categories

var CATEGORY_FALLBACK = [
    { id: null, name: "注目", engName: "", url: "", endpoint: "https://note.com/api/v3/notes/top_articles" },
    { id: 1, name: "マンガ", engName: "manga", url: "/categories/manga", endpoint: "https://note.com/api/v1/categories/manga?note_intro_only=true" },
    { id: 2, name: "コラム・エッセイ", engName: "column", url: "/categories/column", endpoint: "https://note.com/api/v1/categories/column?note_intro_only=true" },
    { id: 3, name: "小説", engName: "novel", url: "/categories/novel", endpoint: "https://note.com/api/v1/categories/novel?note_intro_only=true" },
    { id: 4, name: "写真", engName: "photo", url: "/categories/photo", endpoint: "https://note.com/api/v1/categories/photo?note_intro_only=true" },
    { id: 134, name: "ラジオ", engName: "radio", url: "/categories/radio", endpoint: "https://note.com/api/v1/categories/radio?note_intro_only=true" },
    { id: 5, name: "音楽", engName: "music", url: "/categories/music", endpoint: "https://note.com/api/v1/categories/music?note_intro_only=true" },
    { id: null, name: "ビジネス", engName: "business", url: "topic/business", endpoint: "" },
    { id: null, name: "ライフスタイル", engName: "lifestyle", url: "topic/lifestyle", endpoint: "" },
    { id: 8, name: "テクノロジー", engName: "tech", url: "/categories/tech", endpoint: "https://note.com/api/v1/categories/tech?note_intro_only=true" },
    { id: null, name: "デザイン", engName: "design", url: "topic/design", endpoint: "" }
];

function noteCategoryList() {
    let api = apiGet("/api/v2/categories");
    let categories = api.ok && api.data && api.data.data ? api.data.data.categories : null;
    if (categories && categories.length) return categories;
    return CATEGORY_FALLBACK;
}

// Giá trị an toàn cho chuỗi đến từ JSON (thuộc tính thiếu trả về undefined, không phải "").
function asText(value) {
    if (value === null || value === undefined) return "";
    return String(value);
}

// `input` để mở danh sách của một danh mục: ưu tiên đường dẫn, rồi engName, cuối cùng là endpoint.
function categoryInput(category) {
    if (!category) return "";
    let url = asText(category.url);
    if (url !== "") return url;
    let engName = asText(category.engName);
    if (engName !== "") return engName;
    return asText(category.endpoint);
}

function findCategory(input) {
    let text = String(input || "").trim();
    let categories = noteCategoryList();

    // Khớp thẳng theo endpoint (ví dụ danh mục "注目" không có url/engName).
    for (let i = 0; i < categories.length; i++) {
        if (asText(categories[i].endpoint) !== "" && asText(categories[i].endpoint) === text) return categories[i];
    }

    let engName = "";
    let match = /categories\/([A-Za-z0-9_\-]+)/.exec(text);
    if (!match) match = /topic\/([A-Za-z0-9_\-]+)/.exec(text);
    if (match) engName = match[1];
    else if (text.indexOf("http") !== 0) engName = text;

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        if (engName !== "" && (asText(category.engName) === engName || asText(category.name) === text)) return category;
    }
    if (text.indexOf("http") === 0) return { name: text, engName: engName, url: text, endpoint: text };
    return engName === "" ? null : { name: engName, engName: engName, url: "", endpoint: "" };
}

function categoryList(input, page) {
    page = page || "1";
    let category = findCategory(input);
    if (!category) return Response.error("note.com: không xác định được danh mục");
    let name = String(category.name || category.engName || input);

    let endpoint = String(category.endpoint || "");
    if (endpoint !== "") {
        let api = apiGetUrl(endpoint + (endpoint.indexOf("?") >= 0 ? "&" : "?") + "page=" + page);
        if (!api.ok) return Response.error("note.com: HTTP " + api.status + " khi tải danh mục " + name);
        let body = api.data && api.data.data ? api.data.data : null;
        if (!body) return Response.error("note.com: dữ liệu danh mục không hợp lệ");
        let notes = body.notes || body.articles || [];
        let items = [];
        for (let i = 0; i < notes.length; i++) {
            let item = noteItem(notes[i]);
            if (item && item.name !== "") items.push(item);
        }
        let next = body.last_page ? "" : String(parseInt(page, 10) + 1);
        return Response.success(items, next);
    }

    let engName = String(category.engName || "");
    if (engName === "") return Response.error("note.com: danh mục " + name + " không có API danh sách");
    let items = sectionsToItems(topicSections(engName));
    if (!items.length) return Response.error("note.com: không tải được danh mục " + name);
    return Response.success(items, "");
}

// Chip danh mục cho trang chi tiết: khớp classify_categories, hoặc hashtag trùng tên danh mục.
function noteCategoryChips(note) {
    let chips = [];
    let names = {};
    let categories = noteCategoryList();

    let classified = note.classify_categories || [];
    for (let i = 0; i < classified.length; i++) {
        for (let j = 0; j < categories.length; j++) {
            if (categories[j].id !== null && categories[j].id === classified[i].id) {
                let category = categories[j];
                chips.push({ title: "カテゴリー: " + category.name, input: categoryInput(category), script: "categories.js" });
                names[String(category.name)] = true;
            }
        }
    }

    let hashtags = note.hashtag_notes || [];
    for (let i = 0; i < hashtags.length; i++) {
        let tag = hashtags[i].hashtag ? tagNameOf(hashtags[i].hashtag.name) : "";
        for (let j = 0; j < categories.length; j++) {
            if (String(categories[j].name) === tag && !names[tag]) {
                let category = categories[j];
                chips.push({ title: "カテゴリー: " + category.name, input: categoryInput(category), script: "categories.js" });
                names[tag] = true;
            }
        }
    }
    return chips;
}

function categoryNameMatched(note) {
    let names = {};
    let categories = noteCategoryList();
    let hashtags = note.hashtag_notes || [];
    for (let i = 0; i < hashtags.length; i++) {
        let tag = hashtags[i].hashtag ? tagNameOf(hashtags[i].hashtag.name) : "";
        for (let j = 0; j < categories.length; j++) {
            if (String(categories[j].name) === tag) names[tag] = true;
        }
    }
    return names;
}

function creatorList(input, page) {
    let text = String(input || "");
    let kind = "note";
    if (text.indexOf("マガジン:") === 0 || text.indexOf("magazines:") === 0) {
        kind = "magazine";
        text = text.replace(/^[^:]+:/, "");
    }
    let urlname = urlnameOf(text) || text.replace(/[?#].*$/, "").replace(/\/+$/, "");
    if (urlname === "") return Response.error("note.com: không xác định được tác giả");
    page = page || "1";
    let api = apiGet("/api/v2/creators/" + encodeURIComponent(urlname) + "/contents?kind=" + kind + "&page=" + page + "&per=20");
    if (!api.ok) return Response.error("note.com: HTTP " + api.status + " khi tải tác giả " + urlname);
    let body = api.data && api.data.data ? api.data.data : null;
    if (!body) return Response.error("note.com: dữ liệu tác giả không hợp lệ");
    let contents = body.contents || [];
    let items = [];
    for (let i = 0; i < contents.length; i++) {
        let item = kind === "magazine" ? magazineItem(contents[i]) : noteItem(contents[i]);
        if (item && item.name !== "") items.push(item);
    }
    let next = body.isLastPage ? "" : String(parseInt(page, 10) + 1);
    return Response.success(items, next);
}

// ---------------------------------------------------------------- magazine API

function magazineSection(key, page) {
    let path = "/api/v1/layout/magazine/" + encodeURIComponent(key) + "/section?page=" + page + "&include_details=true";
    let api = apiGet(path);
    if (!api.ok || !api.data || !api.data.data) return null;
    return api.data.data.section || null;
}

function magazineNotesList(url, page) {
    let key = magazineKey(url);
    if (key === "") return Response.error("note.com: URL tạp chí không hợp lệ");
    page = page || "1";
    let section = magazineSection(key, page);
    if (!section) return Response.error("note.com: không tải được tạp chí " + key);
    let contents = section.contents || [];
    let items = [];
    for (let i = 0; i < contents.length; i++) {
        let item = noteItem(contents[i]);
        if (item && item.name !== "") items.push(item);
    }
    let next = section.is_last_page ? "" : String(parseInt(page, 10) + 1);
    return Response.success(items, next);
}

// Tên tạp chí từ mã (dùng cho tab "マガジン" ở trang chi tiết).
function magazineName(key) {
    let api = apiGet("/api/v1/magazines/" + encodeURIComponent(key));
    if (api.ok && api.data && api.data.data && api.data.data.name) return String(api.data.data.name);
    return "";
}

function magazineChapters(contents) {
    let chapters = [];
    for (let i = 0; i < contents.length; i++) {
        let chapter = noteChapter(contents[i]);
        if (chapter.name !== "" && chapter.url !== "/n/") chapters.push(chapter);
    }
    return chapters;
}

function creatorChapters(contents) {
    let chapters = [];
    for (let i = 0; i < contents.length; i++) {
        let entry = contents[i];
        let chapter = String(entry.key || "").charAt(0) === "m" ? magazineChapter(entry) : noteChapter(entry);
        if (chapter.name !== "" && chapter.url !== "/n/") chapters.push(chapter);
    }
    return chapters;
}

// ---------------------------------------------------------- note.com translation

// Bản dịch của một bài viết: /api/v3/notes/{key}/translations/{lang}.
// note.com hiện chỉ có tiếng Anh ("en" / "en-US"); bài không dịch được sẽ trả về null.
function translatedNote(key, url) {
    let lang = translationLangFor(url);
    if (lang === "" || key === "") return null;
    let api = apiGet("/api/v3/notes/" + key + "/translations/" + lang);
    if (!api.ok || !api.data || !api.data.data) {
        console.log("note.com: bài " + key + " không có bản dịch " + lang + " (HTTP " + api.status + "), dùng bản gốc");
        return null;
    }
    let translation = api.data.data;
    if (String(translation.body || "") === "") return null;
    return translation;
}
