function execute() {
    return Response.success([
        {title: "同人小说", input: "tongren/index.html♥tongren/index_{0}.html", script: "gen.js"},
        {title: "全本同人", input: "tags-150-0.html♥tags-150-{0}.html♥{0}-1", script: "gen.js"},
        {title: "连载同人", input: "tags-151-0.html♥tags-151-{0}.html♥{0}-1", script: "gen.js"},
        {title: "排行榜单", input: "hot♥hot/index_{0}.html", script: "gen.js"},
    ]);
}