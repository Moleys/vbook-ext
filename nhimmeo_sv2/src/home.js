function execute() {
    return Response.success([
        {title: "全部分类", input: "0", script: "gen.js"},
        {title: "User chap", input: "userchap", script: "gen2.js"}
    ]);
}