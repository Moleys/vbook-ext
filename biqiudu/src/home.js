function execute() {
    return Response.success([
        {title: "首页", input: "http://www.biqiudu.com/", script: "gen.js"},
        {title: "玄幻小说", input:  "http://www.biqiudu.com/sort/1/", script: "gen.js"},
        {title: "修真小说", input:  "http://www.biqiudu.com/sort/2/", script: "gen.js"},
        {title: "都市小说", input:  "http://www.biqiudu.com/sort/3/", script: "gen.js"},
        {title: "历史小说", input:  "http://www.biqiudu.com/sort/4/", script: "gen.js"},
        {title: "网游小说", input:  "http://www.biqiudu.com/sort/5/", script: "gen.js"},
        {title: "科幻小说", input:  "http://www.biqiudu.com/sort/6/", script: "gen.js"},
        {title: "其它小说", input:  "http://www.biqiudu.com/sort/7/", script: "gen.js"}

    ]);
}