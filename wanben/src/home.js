function execute() {
    return Response.success([
        {title: "首页", input: "http://www.wanben.org/", script: "gen.js"},
        {title: "男生", input: "https://www.wanben.org/male.html", script: "gen.js"},
        {title: "女生", input: "https://www.wanben.org/female.html", script: "gen.js"}

    ]);
}