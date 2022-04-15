function execute() {
    return Response.success([
        {title: "全部分类", input: "0", script: "gen.js"},
        {title: "玄幻奇幻", input: "8", script: "gen.js"},
        {title: "都市青春", input: "27", script: "gen.js"},
        {title: "灵异未知", input: "1", script: "gen.js"},
        {title: "历史军事", input: "30", script: "gen.js"},
        {title: "科幻无限", input: "6", script: "gen.js"},
        {title: "游戏竞技", input: "3", script: "gen.js"},
        {title: "仙侠武侠", input: "5", script: "gen.js"},
        {title: "免费同人", input: "24", script: "gen.js"},
        {title: "女频", input: "11", script: "gen.js"}

    ]);
}