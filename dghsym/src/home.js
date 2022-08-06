function execute() {
    return Response.success([
        {title: "最新章节", input: "chap", script: "gen.js"},
        {title: "最新小说", input: "book", script: "gen.js"}
    ]);
}