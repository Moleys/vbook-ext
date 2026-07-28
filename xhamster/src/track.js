load('config.js');

function execute(url) {
    return Response.success({
        data: url,
        type: "native",
        headers: {
            "User-Agent": UA,
            "Referer": BASE_URL + "/",
            "Origin": BASE_URL
        },
        host: BASE_URL,
        timeSkip: []
    });
}
