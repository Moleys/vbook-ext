load('config.js');

function execute(url) {
    return Response.success({
        data: url,
        type: "native",
        headers: {
            "User-Agent": UA,
            "Referer": REFERRER,
            "Origin": REFERRER
        },
        host: BASE_URL,
        timeSkip: []
    });
}
