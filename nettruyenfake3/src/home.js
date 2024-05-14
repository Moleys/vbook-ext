load('config.js');
function execute() {
    return Response.success([
        {title: "Mới cập nhật", input: BASE_URL + "/all-manga/1/?latest-updated", script: "gen.js"},
        {title: "Truyện mới", input: BASE_URL + "/all-manga/1/?release-date", script: "gen.js"},
        {title: "Top all", input: BASE_URL + "/all-manga/1/?sort=views", script: "gen.js"},
        {title: "Top tháng", input: BASE_URL + "/all-manga/1/?views_month", script: "gen.js"},
        {title: "Top tuần", input: BASE_URL + "/all-manga/1/?views_week", script: "gen.js"},
        {title: "Top ngày", input: BASE_URL + "/all-manga/1/?views_day", script: "gen.js"},
        {title: "Đánh giá cao", input: BASE_URL + "/all-manga/1/?score", script: "gen.js"},
        {title: "Bình luận", input: BASE_URL + "/all-manga/1/?sort=25", script: "gen.js"}
    ]);
}