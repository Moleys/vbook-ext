function execute() {
    return Response.success([
        {title: "首页", input: "http://www.sbooktxt.com/", script: "gen.js"},
        {title: "玄幻小说", input:  "http://www.sbooktxt.com/xuanhuan/", script: "gen.js"},
        {title: "修真小说", input:  "http://www.sbooktxt.com/xiuzhen/", script: "gen.js"},
        {title: "都市小说", input:  "http://www.sbooktxt.com/dushi/", script: "gen.js"},
        {title: "历史小说", input:  "http://www.sbooktxt.com/lishi/", script: "gen.js"},
        {title: "网游小说", input:  "http://www.sbooktxt.com/wangyou/", script: "gen.js"},
        {title: "科幻小说", input:  "http://www.sbooktxt.com/kehuan/", script: "gen.js"},
        {title: "言情小说", input:  "http://www.sbooktxt.com/yanqing/", script: "gen.js"},
        {title: "其他小说", input:  "http://www.sbooktxt.com/qita/", script: "gen.js"},
        {title: "全本小说", input:  "http://www.sbooktxt.com/quanben/", script: "gen.js"},
        {title: "临时书架", input:  "http://www.sbooktxt.com/bookcase.html", script: "gen.js"}
    ]);
}