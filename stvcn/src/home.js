function execute() {
    return Response.success([
        {title: "Cập Nhật", input: "http://sangtacviet.me/?find=&minc=0&sort=update&tag=", script: "gen.js"},
        {title: "Nhiều Like", input: "http://sangtacviet.me/?find=&minc=0&sort=upvote&tag=", script: "gen.js"},
        {title: "Truyện HOT", input: "https://sangtacviet.me/?find=&minc=0&sort=star&tag=", script: "gen.js"},
        {title: "Top Tuần", input: "https://sangtacviet.me/?find=&minc=0&sort=viewweek&tag=", script: "gen.js"},
    ]);
}