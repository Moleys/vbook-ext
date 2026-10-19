load('config.js');

// The toc url is already a direct media stream URL — pass it through as the
// single source; track.js then wraps it into the playback object.
function execute(url) {
    if (!url) return Response.error("Thiếu URL track");
    return Response.success([
        { title: "Mặc định", data: url },
    ]);
}
