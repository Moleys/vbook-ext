function execute() {
    return Response.success([
        {title: "今日更新", input: "https://www.wenku8.net/modules/article/toplist.php?sort=lastupdate", script: "gen.js"},
        {title: "轻小说列表", input: "https://www.wenku8.net/modules/article/articlelist.php", script: "gen.js"},
        {title: "热门轻小说", input: "https://www.wenku8.net/modules/article/toplist.php?sort=allvisit", script: "gen.js"},
        {title: "动画化作品", input: "https://www.wenku8.net/modules/article/toplist.php?sort=anime", script: "gen.js"},
        {title: "新书一览", input: "https://www.wenku8.net/modules/article/toplist.php?sort=postdate", script: "gen.js"},
        {title: "完结全本", input: "https://www.wenku8.net/modules/article/articlelist.php?fullflag=1", script: "gen.js"}

    ]);
}