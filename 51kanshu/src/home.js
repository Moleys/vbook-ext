function execute() {
    return Response.success([
        {title: "首页", input: "http://www.51kanshu.cc/", script: "gen.js"},
        {title: "玄幻小说", input:  "http://www.51kanshu.cc/list/1-1.html", script: "gen.js"},
        {title: "修真小说", input:  "http://www.51kanshu.cc/list/2-1.html", script: "gen.js"},
        {title: "都市小说", input:  "http://www.51kanshu.cc/list/3-1.html", script: "gen.js"},
        {title: "历史小说", input:  "http://www.51kanshu.cc/list/4-1.html", script: "gen.js"},
        {title: "网游小说", input:  "http://www.51kanshu.cc/list/5-1.html", script: "gen.js"},
        {title: "科幻小说", input:  "http://www.51kanshu.cc/list/6-1.html", script: "gen.js"},
        {title: "其他小说", input:  "http://www.51kanshu.cc/list/7-1.html", script: "gen.js"},
        {title: "全本小说", input:  "http://www.51kanshu.cc/quanben/", script: "gen.js"}

    ]);
}