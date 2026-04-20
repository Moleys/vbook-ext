load('config.js');

function execute(url) {

    return Response.success({
        data: url,
        type: "native",
        headers: {},
        host: API_URL,
        timeSkip: []
    });
}
