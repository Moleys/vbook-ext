// Hoàng Quả (HGhub edge API) — shared helpers.
// Upstream: every /api/** call goes through POST /api/edge/request with an
// envelope {method, path, body(base64), content_type} and Bearer token. This
// extension is guest-only, so no token is ever sent.
let BASE_URL = "https://huangguoai.com";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}

// Episode links carry ?ep=N so toc entries route back through detail/toc/chap.
function videoLink(id, ep) {
    var url = BASE_URL + "/video/" + id;
    if (ep) url = url + "?ep=" + ep;
    return url;
}

// regexp captures the numeric id; ep is optional.
function parseId(url) {
    var m = url.match(/\/video\/(\d+)/);
    return m ? m[1] : "";
}

function parseEp(url) {
    var m = url.match(/[?&]ep=(\d+)/);
    return m ? m[1] : "1";
}

// GET via the edge envelope. Throws on transport or API failure so scripts can
// let Response.error surface a real message.
function edgeGet(path) {
    var envelope = JSON.stringify({ method: "GET", path: path, body: "", content_type: "" });
    var response = fetch(BASE_URL + "/api/edge/request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Referer": BASE_URL + "/",
            "Accept": "application/json"
        },
        body: envelope,
        timeout: 20000
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    var value = response.json();
    if (value.status !== 1) throw new Error(value.msg || "API trả về thất bại");
    return value.data;
}

function edgePost(path, bodyObj) {
    var encoded = "";
    try {
        encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(bodyObj)));
    } catch (error) {
        throw new Error("Cần load('crypto.js') trước khi gọi edgePost");
    }
    var envelope = JSON.stringify({ method: "POST", path: path, body: encoded, content_type: "application/json" });
    var response = fetch(BASE_URL + "/api/edge/request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Referer": BASE_URL + "/",
            "Accept": "application/json"
        },
        body: envelope,
        timeout: 20000
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    var value = response.json();
    if (value.status !== 1) throw new Error(value.msg || "API trả về thất bại");
    return value.data;
}

// Site covers are AES-128-CBC ciphertext (key/IV from HGhub src-tauri/src/media.rs).
// Decrypt to a data URI so the app shows a real image; fall back to the raw URL.
function decryptCover(url) {
    if (!url) return "";
    try {
        var response = fetch(url, { headers: { "Referer": BASE_URL + "/" }, timeout: 20000 });
        if (!response.ok) return url;
        var cipher = CryptoJS.enc.Base64.parse(response.base64());
        var plain = CryptoJS.AES.decrypt(
            { ciphertext: cipher },
            CryptoJS.enc.Utf8.parse("f5d965df75336270"),
            { iv: CryptoJS.enc.Utf8.parse("97b60394abc2fbe1"), padding: CryptoJS.pad.Pkcs7 }
        );
        var out = plain.toString(CryptoJS.enc.Base64);
        if (!out || out.length < 100) return url;
        return "data:image/jpeg;base64," + out;
    } catch (error) {
        return url;
    }
}

// Ưu tiên PHP cover proxy (cover.php kèm extension) — trả ảnh thường nhanh hơn
// giải mã base64 trong script; không có PROXY thì fallback sang data URI AES.
function coverUrl(url) {
    if (!url) return "";
    try {
        if (PROXY) return String(PROXY).replace(/\/+$/, "") + "/cover.php?u=" + encodeURIComponent(url);
    } catch (error) {
    }
    return decryptCover(url);
}

// One listing row shared by search/home/genre paths.
function cardItem(v) {
    return {
        name: v.title,
        cover: coverUrl(v.cover),
        link: videoLink(v.id),
        description: v.description || "",
        tag: (v.is_finished ? "Hoàn tất" : "Đang cập nhật")
            + " · " + v.episode_count + " tập"
            + " · " + (v.score || "")
    };
}

function hasNext(pagination, page) {
    return pagination && Number(pagination.pages) > Number(page)
        ? String(Number(page) + 1)
        : "";
}
