function execute() {
    return Response.success([
        {title: "首页", input: "http://www.imcap.cn/", script: "gen.js"},
        {title: "玄幻小说", input: "http://www.imcap.cn/xuanhuan", script: "gen.js"}, 
        {title: "修真小说", input: "http://www.imcap.cn/xiuzhen", script: "gen.js"}, 
        {title: "都市小说", input: "http://www.imcap.cn/dushi", script: "gen.js"}, 
        {title: "历史小说", input: "http://www.imcap.cn/lishi", script: "gen.js"}, 
        {title: "网游小说", input: "http://www.imcap.cn/wangyou", script: "gen.js"}, 
        {title: "科幻小说", input: "http://www.imcap.cn/kehuan", script: "gen.js"}, 
        {title: "女频小说", input: "http://www.imcap.cn/nvpin", script: "gen.js"}

    ]);
}