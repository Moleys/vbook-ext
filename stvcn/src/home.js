function execute() {
    return Response.success([
        {title: "Cập Nhật", input: "http://14.225.254.182/?find=&minc=0&sort=update&tag=", script: "gen.js"},
        {title: "Nhiều Like", input: "http://14.225.254.182/?find=&minc=0&sort=upvote&tag=", script: "gen.js"},
        {title: "Truyện HOT", input: "http://14.225.254.182/?find=&minc=0&sort=star&tag=", script: "gen.js"},
        {title: "Top Tuần", input: "http://14.225.254.182/?find=&minc=0&sort=viewweek&tag=", script: "gen.js"},
    ]);
}