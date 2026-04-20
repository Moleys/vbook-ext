load('config.js');

function execute() {
    return Response.success([
        { title: "Mới cập nhật", input: API_URL + "/danh-sach/phim-moi-cap-nhat", script: "update.js" },
        { title: "Phim lẻ", input: API_URL + "/v1/api/danh-sach/phim-le", script: "gen.js" },
        { title: "Phim bộ", input: API_URL + "/v1/api/danh-sach/phim-bo", script: "gen.js" },
        { title: "TV Shows", input: API_URL + "/v1/api/danh-sach/tv-shows", script: "gen.js" },
        { title: "Hoạt hình", input: API_URL + "/v1/api/danh-sach/hoat-hinh", script: "gen.js" },
        { title: "Phim vietsub", input: API_URL + "/v1/api/danh-sach/phim-vietsub", script: "gen.js" },
        { title: "Phim thuyết minh", input: API_URL + "/v1/api/danh-sach/phim-thuyet-minh", script: "gen.js" },
        { title: "Phim lồng tiếng", input: API_URL + "/v1/api/danh-sach/phim-long-tieng", script: "gen.js" },
    ]);
}