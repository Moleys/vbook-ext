function execute() {
    return Response.success([
        {title: "首页", input: "http://www.yyshuku.com/", script: "gen.js"},
        {title: "玄幻魔法", input: "http://www.yyshuku.com/sort/xuanhuanmofa", script: "gen.js"},
        {title: "武侠修真", input: "http://www.yyshuku.com/sort/wuxiaxiuzhen", script: "gen.js"},
        {title: "都市言情", input: "http://www.yyshuku.com/sort/dushiyanqing", script: "gen.js"},
        {title: "历史军事", input: "http://www.yyshuku.com/sort/lishijunshi", script: "gen.js"},
        {title: "网游动漫", input: "http://www.yyshuku.com/sort/wangyoudongman", script: "gen.js"},
        {title: "科幻小说", input: "http://www.yyshuku.com/sort/kehuanxiaoshuo", script: "gen.js"},
        {title: "恐怖灵异", input: "http://www.yyshuku.com/sort/kongbulingyi", script: "gen.js"},
        {title: "其他类型", input: "http://www.yyshuku.com/sort/qita", script: "gen.js"}

    ]);
}