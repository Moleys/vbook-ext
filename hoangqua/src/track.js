load('config.js');
// track.js — chap.js already resolved direct HLS URLs; hand them to the native
// player with the site Referer (CDN checks it).
function execute(data) {
    if (!data) return Response.error("Không có nguồn phát");
    return Response.success({
        type: "native",
        data: data,
        host: BASE_URL,
        mimeType: "application/x-mpegURL",
        headers: { "Referer": BASE_URL + "/" },
        timeSkip: []
    });
}
