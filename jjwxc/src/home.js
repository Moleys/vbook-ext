function execute() {
    return Response.success([
        {title: "完结高分排行榜", input: "https://www.jjwxc.net/topten.php?orderstr=20", script: "gen.js"},
        {title: "中国大陆出版最新签约", input: "https://www.jjwxc.net/copyright.php?publisherid=2", script: "gen.js"}
    ]);
}