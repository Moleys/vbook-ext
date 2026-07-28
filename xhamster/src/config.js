const BASE_URL = "https://xhwide.com";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function cleanText(text) {
    if (!text) return "";
    return text.replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#039;/g, "'")
        .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
}

function getMeta(html, property) {
    var r1 = new RegExp('(?:property|name)=["\']' + property + '["\'][^>]*content=(["\'])(.*?)\\1', 'i');
    var r2 = new RegExp('content=(["\'])(.*?)\\1[^>]*(?:property|name)=["\']' + property + '["\']', 'i');
    var m = html.match(r1) || html.match(r2);
    return m ? m[2] : "";
}

function parseXhList(html) {
    var result = { items: [], totalPages: 1 };
    var script = html.match(/<script[^>]+id=['"]initials-script["']>([\s\S]*?)<\/script>/i);
    if (!script || !script[1]) return result;

    var jsonMatch = script[1].trim().match(/\{[\s\S]*\}/);
    if (!jsonMatch) return result;

    var jsonObj;
    try { jsonObj = JSON.parse(jsonMatch[0]); } catch (e) { return result; }

    var listVideos = null;
    var paginationProps = null;
    var keys = Object.keys(jsonObj);

    for (var i = 0; i < keys.length; i++) {
        var component = jsonObj[keys[i]];
        if (component) {
            if (!listVideos && component.trendingVideoListProps && component.trendingVideoListProps.videoThumbProps) {
                listVideos = component.trendingVideoListProps.videoThumbProps;
            }
            if (!listVideos && component.videoListProps && component.videoListProps.videoThumbProps) {
                listVideos = component.videoListProps.videoThumbProps;
            }
            if (!paginationProps && component.paginationProps) {
                paginationProps = component.paginationProps;
            }
        }
    }

    if (!listVideos || !Array.isArray(listVideos)) return result;

    for (var j = 0; j < listVideos.length; j++) {
        var v = listVideos[j];
        if (!v) continue;
        var cleanSlug = v.pageURL ? v.pageURL.replace("https://xhwide.com/", "").replace("https://xhamster.com/", "") : "";
        result.items.push({
            name: v.title || "No Title",
            link: BASE_URL + "/" + cleanSlug,
            description: "",
            cover: v.imageURL || v.previewThumbURL || "",
            tag: "",
            host: BASE_URL
        });
    }

    result.totalPages = paginationProps ? (parseInt(paginationProps.lastPageNumber) || 1) : 1;
    return result;
}
