const BASE_URL = "https://missav.media";

const REFERRER = "https://missav123.com/";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function cleanText(text) {
    if (!text) return "";
    return text.replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#039;/g, "'")
        .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
}

function normalizeHtml(html) {
    if (!html) return "";
    return html.replace(/class="([^"]*)"/g, function (full, cv) {
        return 'class="' + cv.replace(/missav_media-/g, '') + '"';
    });
}

function getMeta(html, property) {
    var regex = new RegExp('property="' + property + '"\\s+content="([^"]+)"', 'i');
    var m = html.match(regex);
    return m ? m[1] : "";
}

function getSlug(url) {
    if (!url) return "";
    return url.replace(/^https?:\/\/[^\/]+/, "");
}

function getField(html, labelKey) {
    var regex = new RegExp("<span>" + labelKey + ":<\\/span>([\\s\\S]*?)<\\/div>", "i");
    var m = html.match(regex);
    if (!m) return "";
    var content = m[1];
    var linkMatch = content.match(/<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/i);
    if (linkMatch) return cleanText(linkMatch[2]);
    var timeMatch = content.match(/<time[^>]*>([^<]+)<\/time>/i);
    if (timeMatch) return cleanText(timeMatch[1]);
    var spanMatch = content.match(/<span[^>]*>([^<]+)<\/span>/i);
    if (spanMatch) return cleanText(spanMatch[1]);
    return cleanText(content.replace(/<[^>]+>/g, ""));
}

function getMultiField(html, labelKey) {
    var regexStart = new RegExp("<span>" + labelKey + ":<\\/span>", "i");
    var m = html.match(regexStart);
    if (!m) return "";
    var startIndex = m.index + m[0].length;
    var searchArea = html.substring(startIndex);
    var divEnd = searchArea.indexOf("</div>");
    if (divEnd === -1) divEnd = searchArea.length;
    var content = searchArea.substring(0, divEnd);

    var items = [];
    var linkRegex = /<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
    var lm;
    while ((lm = linkRegex.exec(content)) !== null) {
        var t = cleanText(lm[2]);
        if (t && t.indexOf("<img") === -1) items.push(t);
    }
    return items.join(", ");
}

function extractUuid(html) {
    var uuid = "";

    // Strategy 1: eval() obfuscated code
    var evalMatch = html.match(/eval\(function\(p,a,c,k,e,d\)[\s\S]*?'([^']+)'\.split\('\|'\)/i);
    if (evalMatch) {
        var parts = evalMatch[1].split('|');
        var hasSurrit = false;
        for (var i = 0; i < parts.length; i++) {
            if (parts[i] === 'surrit' || parts[i] === 'sixyik') { hasSurrit = true; break; }
        }
        if (hasSurrit) {
            var uuidParts = [];
            for (var j = 0; j < parts.length; j++) {
                if (parts[j].match(/^[0-9a-f]{8,12}$/)) uuidParts.push(parts[j]);
            }
            if (uuidParts.length >= 5) {
                uuid = uuidParts[0] + '-' + uuidParts[1] + '-' + uuidParts[2] + '-' + uuidParts[3] + '-' + uuidParts[4];
            }
        }
    }

    // Strategy 2: direct domain scan
    if (!uuid) {
        var dm = html.match(/surrit\.com\/([0-9a-f-]{36})/i) ||
            html.match(/sixyik\.com\/([0-9a-f-]{36})/i) ||
            html.match(/nineyu\.com\/([0-9a-f-]{36})/i) ||
            html.match(/fourhoi\.com\/([0-9a-f-]{36})/i);
        if (dm) uuid = dm[1];
    }

    // Strategy 3: deep UUID scan
    if (!uuid) {
        var matches = html.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi) || [];
        var blacklist = ["snaptrckr", "user_uuid", "popunder", "banner", "monitoring", "crypto", "randomUUID", "generateUUID"];
        for (var k = 0; k < matches.length; k++) {
            var u = matches[k];
            var isBad = false;
            var idx = html.indexOf(u);
            if (idx !== -1) {
                var ctx = html.substring(Math.max(0, idx - 80), Math.min(html.length, idx + 80));
                for (var l = 0; l < blacklist.length; l++) {
                    if (ctx.indexOf(blacklist[l]) !== -1) { isBad = true; break; }
                }
            }
            if (!isBad) { uuid = u; break; }
        }
    }

    return uuid;
}

// Trích m3u8 URL theo phương pháp reliable từ packed JS:
// Pattern 'm3u8(.*?)video -> split('|') -> reverse -> build URL
function extractM3u8(html) {
    var mA = html.match(/'m3u8(.*?)video/);
    if (mA) {
        var parts = mA[1].split("|");
        parts.reverse();
        if (parts.length >= 9 && parts[1] && parts[2] && parts[3]
            && parts[4] && parts[5] && parts[6] && parts[7] && parts[8]) {
            return parts[1] + "://" + parts[2] + "." + parts[3] + "/"
                + parts[4] + "-" + parts[5] + "-" + parts[6] + "-" + parts[7] + "-" + parts[8]
                + "/playlist.m3u8";
        }
    }

    // Fallback 1: direct domain scan (surrit/sixyik trên mrstcdn.store hoặc .com)
    var dom = html.match(/https?:\/\/(?:surrit|sixyik)\.[a-z0-9.-]+\/[0-9a-f-]{36}\/playlist\.m3u8/i);
    if (dom) return dom[0];

    // Fallback 2: UUID -> surrit.mrstcdn.store
    var uuid = extractUuid(html);
    if (uuid) return "https://surrit.mrstcdn.store/" + uuid + "/playlist.m3u8";

    return "";
}

function parseMissavList(rawHtml) {
    var html = normalizeHtml(rawHtml);
    var movies = [];

    var parts = html.split('thumbnail group');
    if (parts.length <= 1) parts = html.split('class="thumbnail');

    for (var i = 1; i < parts.length; i++) {
        var itemHtml = parts[i];

        var fullLinkMatch = itemHtml.match(/<a[^>]+href="([^"]+)"/);
        var slug = "";
        if (fullLinkMatch) {
            slug = fullLinkMatch[1].replace(/https?:\/\/[^\/]+/, "");
            if (slug.indexOf("/") !== 0) slug = "/" + slug;
        }

        if (!slug || slug.indexOf('actresses') !== -1 || slug.indexOf('genres') !== -1) continue;
        if (slug.indexOf('item.') !== -1 || slug.indexOf('{{') !== -1 || slug === "/" || slug === "#") continue;
        if (slug.indexOf('/vi/') === -1) continue;

        var codeMatch = itemHtml.match(/class="[^"]*text-nord13[^"]*"[^>]*>([\s\S]*?)<\/a>/);
        var code = codeMatch ? cleanText(codeMatch[1]) : "";
        if (!code) { var sp = slug.split("/"); code = sp[sp.length - 1]; }

        var titleCandidates = [];
        var imgFullMatch = itemHtml.match(/<img[^>]+(?:alt|title)="([^"]+)"/i);
        if (imgFullMatch) titleCandidates.push(cleanText(imgFullMatch[1]));
        var otherTitleRegex = /title="([^"]+)"/gi;
        var tMatch;
        while ((tMatch = otherTitleRegex.exec(itemHtml)) !== null) {
            var val = cleanText(tMatch[1]);
            if (val.toUpperCase() !== code.toUpperCase()) titleCandidates.push(val);
        }

        var bestTitle = "";
        for (var c = 0; c < titleCandidates.length; c++) {
            if (titleCandidates[c].length > bestTitle.length) bestTitle = titleCandidates[c];
        }

        var cleanTitle = bestTitle || code;
        if (code && cleanTitle.toUpperCase().indexOf(code.toUpperCase()) === 0) {
            var stripped = cleanTitle.substring(code.length).trim();
            if (stripped.indexOf("-") === 0 || stripped.indexOf(" ") === 0) stripped = stripped.substring(1).trim();
            if (stripped.length > 3) cleanTitle = stripped;
        }
        if (!cleanTitle) cleanTitle = code || "No Title";

        var thumbMatch = itemHtml.match(/<img[\s\S]*?data-src="([^"]+)"/) || itemHtml.match(/<img[\s\S]*?src="([^"]+)"/);
        var thumb = thumbMatch ? thumbMatch[1] : "";
        if (thumb && thumb.indexOf("cover-t.jpg") !== -1) thumb = thumb.replace("/cover-t.jpg", "/cover.jpg");

        var isUncensored = itemHtml.indexOf("Không kiểm duyệt") !== -1 ||
            itemHtml.indexOf("Uncensored") !== -1 ||
            itemHtml.indexOf("bg-blue-800") !== -1;

        var durationMatch = itemHtml.match(/<span[^>]*>\s*(\d+):(\d+):(\d+)\s*<\/span>/);
        var duration = durationMatch ? durationMatch[1] + ":" + durationMatch[2] + ":" + durationMatch[3] : "";

        if (cleanTitle.indexOf('item.') !== -1 || cleanTitle.indexOf('{{') !== -1) continue;

        movies.push({
            name: cleanTitle,
            link: BASE_URL + slug,
            description: duration,
            cover: thumb,
            tag: isUncensored ? "K.K.Duyệt" : "HD",
            host: BASE_URL
        });
    }

    var totalPages = 1;
    var allPageNums = html.match(/page=(\d+)/g);
    if (allPageNums) {
        for (var p = 0; p < allPageNums.length; p++) {
            var pn = parseInt(allPageNums[p].match(/\d+/)[0]);
            if (pn > totalPages) totalPages = pn;
        }
    }

    return { items: movies, totalPages: totalPages };
}
