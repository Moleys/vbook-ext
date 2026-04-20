load('config.js');

function execute(url) {
    var slug = url.split("/").pop();

    var response = fetch(API_URL + "/phim/" + slug);
    console.log(API_URL + "/phim/" + slug)
    if (!response.ok) {
        return null;
    }
    var json = response.json();
    var episodes = json.episodes || [];
    var list = [];
    var hasMultipleServers = episodes.length > 1;

    for (var i = 0; i < episodes.length; i++) {
        var server = episodes[i] || {};
        var serverName = server.server_name ? String(server.server_name).trim() : "";
        var items = server.server_data || [];

        if (hasMultipleServers && serverName) {
            list.push({
                name: serverName,
                type: "section"
            });
        }

        for (var j = 0; j < items.length; j++) {
            var episode = items[j] || {};
            var streamUrl = episode.link_m3u8;
            if (!streamUrl) {
                continue;
            }

            list.push({
                name: episode.name ? String(episode.name) : "Episode " + (j + 1),
                url: streamUrl,
                host: BASE_URL
            });
        }
    }

    return Response.success(list);
}
