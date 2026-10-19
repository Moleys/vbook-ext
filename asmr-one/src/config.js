// BASE_URL: site frontend; API_BASE: JSON API backend of asmr.one.
// Both can be overridden by the DOMAIN / API_DOMAIN config keys.
let BASE_URL = "https://asmr.one";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}

let API_BASE = "https://api.asmr-200.com";
try {
    if (API_DOMAIN) {
        API_BASE = API_DOMAIN;
    }
} catch (error) {
}

// Rewrite an incoming url's host to BASE_URL, keeping path/query.
function normalizeUrl(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}

// Prefer the zh-cn (site UI) name, fall back to en/ja/raw.
function localTagName(tag) {
    if (!tag) return "";
    var i18n = tag.i18n;
    if (i18n) {
        if (i18n["zh-cn"] && i18n["zh-cn"].name) return i18n["zh-cn"].name;
        if (i18n["en-us"] && i18n["en-us"].name) return i18n["en-us"].name;
        if (i18n["ja-jp"] && i18n["ja-jp"].name) return i18n["ja-jp"].name;
    }
    return tag.name || "";
}

function fmtDuration(sec) {
    sec = parseInt(sec, 10) || 0;
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
}

function workToItem(work) {
    var cover = work.mainCoverUrl || work.thumbnailCoverUrl || work.samCoverUrl || "";
    var desc = "";
    if (work.circle && work.circle.name) {
        desc = work.circle.name;
    }
    var tag = "";
    if (work.rate_average_2dp) {
        tag = "★ " + work.rate_average_2dp;
    }
    if (work.price > 0) {
        tag = tag ? tag + " | " + work.price + "¥" : work.price + "¥";
    }
    return {
        name: work.title || "",
        cover: cover,
        link: BASE_URL + "/work/" + work.id,
        description: desc,
        tag: tag,
    };
}

function parseWorks(json) {
    var works = json.works || [];
    var items = [];
    for (var i = 0; i < works.length; i++) {
        items.push(workToItem(works[i]));
    }
    return items;
}

// Next-page token: "" when there are no more pages.
function nextPageToken(json, page) {
    page = page || "1";
    var p = json.pagination;
    if (!p) return "";
    var pageSize = parseInt(p.pageSize, 10) || 20;
    var total = parseInt(p.totalCount, 10) || 0;
    var totalPages = Math.ceil(total / pageSize);
    if (parseInt(page, 10) < totalPages) {
        return (parseInt(page, 10) + 1).toString();
    }
    return "";
}

// Shared helper for the paginated /api/works lists.
// `subtitle` is optional: pass "0" / "1" to include the subtitle filter.
function fetchWorksList(order, page, subtitle) {
    page = page || "1";
    var queries = { order: order, sort: "desc", page: page, pageSize: "20" };
    if (subtitle === "0" || subtitle === "1") {
        queries.subtitle = subtitle;
    }
    var resp = fetch(API_BASE + "/api/works", {
        queries: queries,
        headers: { "Referer": BASE_URL },
    });
    if (!resp.ok) return null;
    return resp.json();
}
