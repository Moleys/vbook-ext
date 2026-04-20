load('config.js');

function execute(url) {
    var slug = url.split("/").pop();

    var response = fetch(API_URL + "/phim/" + slug);
    if (!response.ok) {
        return null;
    }

    var json = response.json();
    var genres = [];
    var countries = [];
    var years = [];
    var catalogs = [];


    var detail = [];
    var movie = json.movie || {};

    var alt = movie.origin_name;



    var current_episode = 0;

    if (movie.episodes && movie.episodes[0] && movie.episodes[0].server_data) {
        current_episode = movie.episodes[0].server_data.length;
    }

    var ongoing = true;
    if (movie.total_episodes) {
        ongoing = current_episode != movie.total_episodes;
    }

    if (movie.total_episodes) {
        ongoing = current_episode != movie.total_episodes;
    }

    var update = movie.modified.time;
    var current_episode_text = movie.episode_current;
    var latest = movie.current_episode;
    var release = movie.created.time;

    if (alt) detail.push("Tên khác: " + alt);
    if (latest) detail.push("Mới nhất: " + latest);
    if (release) detail.push("Phát hành: " + release);
    if (update && update != release) detail.push("Cập nhật: " + update);
    if (current_episode_text) detail.push("Tình trạng: " + current_episode_text);

    return Response.success({
        name: movie.name,
        cover: movie.poster_url,
        author: "kkphim",
        description: movie.content,
        detail: detail.join("<br>"),
        ongoing: ongoing,
        genres: [],
        format: "series",
        host: BASE_URL
    });
}

