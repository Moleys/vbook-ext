load('config.js');

function execute(url) {
    var tracks = [];
    tracks.push({
        title: "Server 1",
        data: url
    });
    return Response.success(tracks);
}
