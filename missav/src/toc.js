load('config.js');

function execute(url) {
    var response = fetch(url, { headers: { "User-Agent": UA, "Referer": REFERRER } });
    if (!response.ok) return null;

    var html = response.text();
    var m3u8 = extractM3u8(html);

    var list = [];
    if (m3u8) {
        list.push({ name: "Full", url: m3u8, host: BASE_URL });
    }

    return Response.success(list);
}
