function execute() {
    return Response.success([
        {title: "玄幻小说", input: "http://www.paoshu8.com/xuanhuanxiaoshuo/", script: "gen.js"},
        {title: "修真小说", input: "http://www.paoshu8.com/xiuzhenxiaoshuo/", script: "gen.js"},
        {title: "都市小说", input: "http://www.paoshu8.com/dushixiaoshuo/", script: "gen.js"},
        {title: "穿越小说", input: "http://www.paoshu8.com/chuanyuexiaoshuo/", script: "gen.js"},
        {title: "网游小说", input: "http://www.paoshu8.com/wangyouxiaoshuo/", script: "gen.js"},
        {title: "科幻小说", input: "http://www.paoshu8.com/kehuanxiaoshuo/", script: "gen.js"}

    ]);
}