function execute() {
    return Response.success([
        {title: "小说排行", input: "all", script: "gen.js"},
        {title: "日轻", input: "trans", script: "gen.js"},
        {title: "原创", input: "ori", script: "gen.js"},


    ]);
}