load('config.js');

function execute(data) {
    if (!data) return Response.error("Thiếu dữ liệu track");

    var mime = "audio/mpeg";
    if (data.indexOf(".m4a") !== -1 || data.indexOf(".mp4") !== -1 || data.indexOf(".aac") !== -1) {
        mime = "audio/mp4";
    } else if (data.indexOf(".wav") !== -1) {
        mime = "audio/wav";
    } else if (data.indexOf(".flac") !== -1) {
        mime = "audio/flac";
    } else if (data.indexOf(".ogg") !== -1 || data.indexOf(".opus") !== -1) {
        mime = "audio/ogg";
    }

    return Response.success({
        type: "native",
        data: data,
        host: "",
        mimeType: mime,
        headers: { "Referer": BASE_URL, "User-Agent": UserAgent.chrome() },
        audios: [],
        lyrics: [],
    });
}
