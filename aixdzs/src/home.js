function execute() {
    return Response.success([
        {title: "最新更新", input: "https://m.aixdzs.com/new", script: "gen.js"},
        {title: "热门日榜", input: "https://m.aixdzs.com/hot/day", script: "gen.js"},
        {title: "热门月榜", input: "https://m.aixdzs.com/hot/month", script: "gen.js"},
        {title: "热门总榜", input: "https://m.aixdzs.com/hot", script: "gen.js"},
        {title: "完结作品", input: "https://m.aixdzs.com/end", script: "gen.js"},


    ]);
}