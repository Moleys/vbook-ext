load('config.js');

function execute(url) {
    var response = fetch(url, { headers: { "User-Agent": UA } });
    if (!response.ok) return null;

    var html = response.text();

    var streamUrl = "";
    var preloadM = html.match(/rel="preload"\s+href="([\s\S]*?m3u8)"/i);
    if (preloadM) streamUrl = preloadM[1];

    var list = [];
    if (streamUrl) {
        list.push({ name: "Full", url: streamUrl, host: BASE_URL });
    }

    return Response.success(list);
}
