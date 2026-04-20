load('config.js');
load('base64.js');
function execute(url) {


    let tracks = [];
    tracks.push({
        title: "Server 1",
        data: url,
    });
    return Response.success(tracks);
}


