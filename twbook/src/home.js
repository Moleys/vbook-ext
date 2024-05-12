function execute() {
    return Response.success([
        {title: "最新發佈", input: "bookstack", script: "gen.js"}
    ]);
}