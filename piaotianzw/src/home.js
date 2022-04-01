function execute() {
    return Response.success([
        {title: "首页", input: "http://www.piaotianzw.com/", script: "gen.js"},
        {title: "玄幻小说", input: "http://www.piaotianzw.com/xuanhuan/", script: "gen.js"},
        {title: "修真小说", input: "http://www.piaotianzw.com/xiuzhen/", script: "gen.js"},
        {title: "都市小说", input: "http://www.piaotianzw.com/dushi/", script: "gen.js"},
        {title: "历史小说", input: "http://www.piaotianzw.com/lishi/", script: "gen.js"},
        {title: "网游小说", input: "http://www.piaotianzw.com/wangyou/", script: "gen.js"},
        {title: "科幻小说", input: "http://www.piaotianzw.com/kehuan/", script: "gen.js"},
        {title: "完本小说", input: "http://www.piaotianzw.com/wanben/", script: "gen.js"}

    ]);
}