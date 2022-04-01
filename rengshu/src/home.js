function execute() {
    return Response.success([
        {title: "扔书网", input: "http://www.rengshu.com/", script: "gen.js"},
        {title: "玄幻小说", input: "http://www.rengshu.com/list_1_1", script: "gen.js"},
        {title: "修真小说", input: "http://www.rengshu.com/list_2_1", script: "gen.js"},
        {title: "都市小说", input: "http://www.rengshu.com/list_3_1", script: "gen.js"},
        {title: "游戏小说", input: "http://www.rengshu.com/list_4_1", script: "gen.js"},
        {title: "历史小说", input: "http://www.rengshu.com/list_5_1", script: "gen.js"},
        {title: "科幻小说", input: "http://www.rengshu.com/list_6_1", script: "gen.js"}

    ]);
}