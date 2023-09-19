function execute() {
    return Response.success([
        {title: "最新更新", input: "/rank/lastupdate", script: "gen.js"}

    ]);
}